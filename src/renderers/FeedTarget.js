import { FeedTarget as CoreFeedTarget } from '../core/FeedTarget.js';

/**
 * A render target used in context of {@link VessertID}.
 *
 * @augments CoreFeedTarget
 */
class FeedTarget extends CoreFeedTarget {

	/**
	 * Constructs a new render target.
	 *
	 * @param {number} [width=1] - The width of the render target.
	 * @param {number} [height=1] - The height of the render target.
	 * @param {FeedTarget~Options} [options] - The configuration object.
	 */
	constructor( width = 1, height = 1, options = {} ) {

		super( width, height, options );

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isWebGLRenderTarget = true;

	}

}

export { FeedTarget, FeedTarget as WebGLRenderTarget };
