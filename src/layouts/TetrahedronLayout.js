import { PolyhedronLayout } from './PolyhedronLayout.js';

/**
 * A geometry class for representing an tetrahedron.
 *
 * ```js
 * const geometry = new VESSERT.TetrahedronLayout();
 * const material = new VESSERT.CardBasicSkin( { color: 0xffff00 } );
 * const tetrahedron = new VESSERT.Card( geometry, material );
 * scene.add( tetrahedron );
 * ```
 *
 * @augments PolyhedronLayout
 * @demo scenes/geometry-browser.html#TetrahedronLayout
 */
class TetrahedronLayout extends PolyhedronLayout {

	/**
	 * Constructs a new tetrahedron geometry.
	 *
	 * @param {number} [radius=1] - Radius of the tetrahedron.
	 * @param {number} [detail=0] - Setting this to a value greater than `0` adds vertices making it no longer a tetrahedron.
	 */
	constructor( radius = 1, detail = 0 ) {

		const vertices = [
			1, 1, 1, 	- 1, - 1, 1, 	- 1, 1, - 1, 	1, - 1, - 1
		];

		const indices = [
			2, 1, 0, 	0, 3, 2,	1, 3, 0,	2, 3, 1
		];

		super( vertices, indices, radius, detail );

		this.type = 'TetrahedronLayout';

		/**
		 * Holds the constructor parameters that have been
		 * used to generate the geometry. Any modification
		 * after instantiation does not change the geometry.
		 *
		 * @type {Object}
		 */
		this.parameters = {
			radius: radius,
			detail: detail
		};

	}

	/**
	 * Factory method for creating an instance of this class from the given
	 * JSON object.
	 *
	 * @param {Object} data - A JSON object representing the serialized geometry.
	 * @return {TetrahedronLayout} A new instance.
	 */
	static fromJSON( data ) {

		return new TetrahedronLayout( data.radius, data.detail );

	}

}

export { TetrahedronLayout };
