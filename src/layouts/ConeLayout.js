import { CylinderLayout } from './CylinderLayout.js';

/**
 * A geometry class for representing a cone.
 *
 * ```js
 * const geometry = new VESSERT.ConeLayout( 5, 20, 32 );
 * const material = new VESSERT.CardBasicSkin( { color: 0xffff00 } );
 * const cone = new VESSERT.Card(geometry, material );
 * scene.add( cone );
 * ```
 *
 * @augments CylinderLayout
 * @demo scenes/geometry-browser.html#ConeLayout
 */
class ConeLayout extends CylinderLayout {

	/**
	 * Constructs a new cone geometry.
	 *
	 * @param {number} [radius=1] - Radius of the cone base.
	 * @param {number} [height=1] - Height of the cone.
	 * @param {number} [radialSegments=32] - Number of segmented faces around the circumference of the cone.
	 * @param {number} [heightSegments=1] - Number of rows of faces along the height of the cone.
	 * @param {boolean} [openEnded=false] - Whether the base of the cone is open or capped.
	 * @param {number} [thetaStart=0] - Start angle for first segment, in radians.
	 * @param {number} [thetaLength=Math.PI*2] - The central angle, often called theta, of the circular sector, in radians.
	 * The default value results in a complete cone.
	 */
	constructor( radius = 1, height = 1, radialSegments = 32, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2 ) {

		super( 0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength );

		this.type = 'ConeLayout';

		/**
		 * Holds the constructor parameters that have been
		 * used to generate the geometry. Any modification
		 * after instantiation does not change the geometry.
		 *
		 * @type {Object}
		 */
		this.parameters = {
			radius: radius,
			height: height,
			radialSegments: radialSegments,
			heightSegments: heightSegments,
			openEnded: openEnded,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

	}

	/**
	 * Factory method for creating an instance of this class from the given
	 * JSON object.
	 *
	 * @param {Object} data - A JSON object representing the serialized geometry.
	 * @return {ConeLayout} A new instance.
	 */
	static fromJSON( data ) {

		return new ConeLayout( data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength );

	}

}

export { ConeLayout };
