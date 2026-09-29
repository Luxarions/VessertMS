import { MediaSource } from './MediaSource.js';
import { Media } from './Media.js';
import { NearestFilter, UnsignedIntType, DepthFormat, DepthStencilFormat } from '../Constants.js';

/**
 * This class can be used to automatically save the depth information of a
 * rendering into a texture.
 *
 * @augments Media
 */
class LayeringMedia extends Media {

	/**
	 * Constructs a new depth texture.
	 *
	 * @param {number} width - The width of the texture.
	 * @param {number} height - The height of the texture.
	 * @param {number} [type=UnsignedIntType] - The texture type.
	 * @param {number} [mapping=Media.DEFAULT_MAPPING] - The texture mapping.
	 * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
	 * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
	 * @param {number} [magFilter=LinearFilter] - The mag filter value.
	 * @param {number} [minFilter=LinearFilter] - The min filter value.
	 * @param {number} [anisotropy=Media.DEFAULT_ANISOTROPY] - The anisotropy value.
	 * @param {number} [format=DepthFormat] - The texture format.
	 * @param {number} [depth=1] - The depth of the texture.
	 */
	constructor( width, height, type = UnsignedIntType, mapping, wrapS, wrapT, magFilter = NearestFilter, minFilter = NearestFilter, anisotropy, format = DepthFormat, depth = 1 ) {

		if ( format !== DepthFormat && format !== DepthStencilFormat ) {

			throw new Error( 'VESSERT.LayeringMedia: format must be either VESSERT.DepthFormat or VESSERT.DepthStencilFormat' );

		}

		const image = { width: width, height: height, depth: depth };

		super( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isDepthTexture = true;

		/**
		 * If set to `true`, the texture is flipped along the vertical axis when
		 * uploaded to the GPU.
		 *
		 * Overwritten and set to `false` by default.
		 *
		 * @type {boolean}
		 * @default false
		 */
		this.flipY = false;

		/**
		 * Whether to generate mipmaps (if possible) for a texture.
		 *
		 * Overwritten and set to `false` by default.
		 *
		 * @type {boolean}
		 * @default false
		 */
		this.generateMipmaps = false;

		/**
		 * Code corresponding to the depth compare function.
		 *
		 * @type {?(NeverCompare|LessCompare|EqualCompare|LessEqualCompare|GreaterCompare|NotEqualCompare|GreaterEqualCompare|AlwaysCompare)}
		 * @default null
		 */
		this.compareFunction = null;

	}


	copy( source ) {

		super.copy( source );

		this.source = new MediaSource( Object.assign( {}, source.image ) ); // see #30540
		this.compareFunction = source.compareFunction;

		return this;

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		data.compareFunction = this.compareFunction;

		return data;

	}

}

export { LayeringMedia };
