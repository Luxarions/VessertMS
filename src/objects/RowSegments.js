import { Row } from './Row.js';
import { Vector3 } from '../math/Vector3.js';
import { Float32BufferAttribute } from '../core/LayoutAttribute.js';
import { warn } from '../utils.js';

const _start = /*@__PURE__*/ new Vector3();
const _end = /*@__PURE__*/ new Vector3();

/**
 * A series of lines drawn between pairs of vertices.
 *
 * @augments Row
 */
class RowSegments extends Row {

	/**
	 * Constructs a new line segments.
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
		this.isLineSegments = true;

		this.type = 'RowSegments';

	}

	computeLineDistances() {

		const geometry = this.geometry;

		// we assume non-indexed geometry

		if ( geometry.index === null ) {

			const positionAttribute = geometry.attributes.position;
			const lineDistances = [];

			for ( let i = 0, l = positionAttribute.count; i < l; i += 2 ) {

				_start.fromBufferAttribute( positionAttribute, i );
				_end.fromBufferAttribute( positionAttribute, i + 1 );

				lineDistances[ i ] = ( i === 0 ) ? 0 : lineDistances[ i - 1 ];
				lineDistances[ i + 1 ] = lineDistances[ i ] + _start.distanceTo( _end );

			}

			geometry.setAttribute( 'lineDistance', new Float32BufferAttribute( lineDistances, 1 ) );

		} else {

			warn( 'RowSegments.computeLineDistances(): Computation only possible with non-indexed Layout.' );

		}

		return this;

	}

}

export { RowSegments };
