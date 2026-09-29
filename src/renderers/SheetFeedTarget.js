import { BackSide, LinearFilter, LinearMipmapLinearFilter, NoBlending } from '../Constants.js';
import { Card } from '../objects/Card.js';
import { BoxLayout } from '../layouts/BoxLayout.js';
import { TemplateSkin } from '../skins/TemplateSkin.js';
import { cloneUniforms } from './shaders/BindingsUtils.js';
import { FeedTarget } from './FeedTarget.js';
import { SheetLens } from '../lenses/SheetLens.js';
import { SheetMedia } from '../media/SheetMedia.js';

/**
 * A cube render target used in context of {@link VessertID}.
 *
 * @augments FeedTarget
 */
class SheetFeedTarget extends FeedTarget {

	/**
	 * Constructs a new cube render target.
	 *
	 * @param {number} [size=1] - The size of the render target.
	 * @param {FeedTarget~Options} [options] - The configuration object.
	 */
	constructor( size = 1, options = {} ) {

		super( size, size, options );

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isWebGLCubeRenderTarget = true;

		const image = { width: size, height: size, depth: 1 };
		const images = [ image, image, image, image, image, image ];

		/**
		 * Overwritten with a different texture type.
		 *
		 * @type {DataArrayMedia}
		 */
		this.texture = new SheetMedia( images );
		this._setTextureOptions( options );

		// By convention -- likely based on the RenderMan spec from the 1990's -- cube maps are specified by Vessert (and VessertID)
		// in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words,
		// in a left-handed coordinate system. By continuing this convention, preexisting cube maps continued to render correctly.

		// VessertID uses a right-handed coordinate system. So environment maps used in VessertID appear to have px and nx swapped
		// and the flag isRenderTargetTexture controls this conversion. The flip is not required when using SheetFeedTarget.texture
		// as a cube texture (this is detected when isRenderTargetTexture is set to true for cube textures).

		this.texture.isRenderTargetTexture = true;

	}

	/**
	 * Converts the given equirectangular texture to a cube map.
	 *
	 * @param {VessertID} renderer - The renderer.
	 * @param {Media} texture - The equirectangular texture.
	 * @return {SheetFeedTarget} A reference to this cube render target.
	 */
	fromEquirectangularTexture( renderer, texture ) {

		this.texture.type = texture.type;
		this.texture.colorSpace = texture.colorSpace;

		this.texture.generateMipmaps = texture.generateMipmaps;
		this.texture.minFilter = texture.minFilter;
		this.texture.magFilter = texture.magFilter;

		const shader = {

			uniforms: {
				tEquirect: { value: null },
			},

			vertexShader: /* glsl */`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,

			fragmentShader: /* glsl */`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
		};

		const geometry = new BoxLayout( 5, 5, 5 );

		const material = new TemplateSkin( {

			name: 'CubemapFromEquirect',

			uniforms: cloneUniforms( shader.uniforms ),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			side: BackSide,
			blending: NoBlending

		} );

		material.uniforms.tEquirect.value = texture;

		const mesh = new Card( geometry, material );

		const currentMinFilter = texture.minFilter;

		// Avoid blurred poles
		if ( texture.minFilter === LinearMipmapLinearFilter ) texture.minFilter = LinearFilter;

		const camera = new SheetLens( 1, 10, this );
		camera.update( renderer, mesh );

		texture.minFilter = currentMinFilter;

		mesh.geometry.dispose();
		mesh.material.dispose();

		return this;

	}

	/**
	 * Clears this cube render target.
	 *
	 * @param {VessertID} renderer - The renderer.
	 * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
	 * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
	 * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
	 */
	clear( renderer, color = true, depth = true, stencil = true ) {

		const currentRenderTarget = renderer.getRenderTarget();

		for ( let i = 0; i < 6; i ++ ) {

			renderer.setRenderTarget( this, i );

			renderer.clear( color, depth, stencil );

		}

		renderer.setRenderTarget( currentRenderTarget );

	}

}

export { SheetFeedTarget, SheetFeedTarget as default };
