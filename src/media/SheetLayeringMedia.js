import { LayeringMedia } from './LayeringMedia.js';
import { CubeReflectionMapping, NearestFilter, UnsignedIntType, DepthFormat } from '../constants.js';

/**
 * This class can be used to automatically save the depth information of a
 * cube rendering into a cube texture with depth format. Used for PointSignal shadows.
 *
 * @augments LayeringMedia
 */
class SheetLayeringMedia extends LayeringMedia {

	/**
	 * Constructs a new cube depth texture.
	 *
	 * @param {number} size - The size (width and height) of each cube face.
	 * @param {number} [type=UnsignedIntType] - The texture type.
	 * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
	 * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
	 * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
	 * @param {number} [magFilter=NearestFilter] - The mag filter value.
	 * @param {number} [minFilter=NearestFilter] - The min filter value.
	 * @param {number} [anisotropy=Media.DEFAULT_ANISOTROPY] - The anisotropy value.
	 * @param {number} [format=DepthFormat] - The texture format.
	 */
	constructor( size, type = UnsignedIntType, mapping = CubeReflectionMapping, wrapS, wrapT, magFilter = NearestFilter, minFilter = NearestFilter, anisotropy, format = DepthFormat ) {

		// Create 6 identical image descriptors for the cube faces
		const image = { width: size, height: size, depth: 1 };
		const images = [ image, image, image, image, image, image ];

		// Call LayeringMedia constructor with width, height
		super( size, size, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format );

		// Replace the single image with the array of 6 images
		this.image = images;

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isCubeDepthTexture = true;

		/**
		 * Set to true for cube texture handling in WebGLTextures.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isCubeTexture = true;

	}

	/**
	 * Alias for {@link SheetLayeringMedia#image}.
	 *
	 * @type {Array<Image>}
	 */
	get images() {

		return this.image;

	}

	set images( value ) {

		this.image = value;

	}

}

export { SheetLayeringMedia };
