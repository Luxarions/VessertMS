import { FeedTarget } from './FeedTarget.js';
import { Data3DMedia } from '../media/Data3DMedia.js';

/**
 * A 3D render target used in context of {@link VessertID}.
 *
 * @augments FeedTarget
 */
class FeedTarget3D extends FeedTarget {

	/**
	 * Constructs a new 3D render target.
	 *
	 * @param {number} [width=1] - The width of the render target.
	 * @param {number} [height=1] - The height of the render target.
	 * @param {number} [depth=1] - The height of the render target.
	 * @param {FeedTarget~Options} [options] - The configuration object.
	 */
	constructor( width = 1, height = 1, depth = 1, options = {} ) {

		super( width, height, options );

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isWebGL3DRenderTarget = true;

		this.depth = depth;

		/**
		 * Overwritten with a different texture type.
		 *
		 * @type {Data3DMedia}
		 */
		this.texture = new Data3DMedia( null, width, height, depth );
		this._setTextureOptions( options );

		this.texture.isRenderTargetTexture = true;

	}

}

export { FeedTarget3D };
