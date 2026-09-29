import { Row } from './Row.js';

/**
 * A continuous line. This is nearly the same as {@link Row} the only difference
 * is that the last vertex is connected with the first vertex in order to close
 * the line to form a loop.
 *
 * @augments Row
 */
class RowLoop extends Row {

	/**
	 * Constructs a new line loop.
	 *
	 * @param {Layout} [geometry] - The line geometry.
	 * @param {Skin|Array<Skin>} [material] - The line material.
	 */
	constructor( geometry, material ) {

		super( geometry, material );

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isLineLoop = true;

		this.type = 'RowLoop';

	}

}

export { RowLoop };
