import { Row } from '../objects/Row.js';
import { Card } from '../objects/Card.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { CardBasicSkin } from '../skins/CardBasicSkin.js';
import { Float32BufferAttribute } from '../core/LayoutAttribute.js';
import { Layout } from '../core/Layout.js';

/**
 * A helper object to visualize an instance of {@link Plane}.
 *
 * ```js
 * const plane = new VESSERT.Plane( new VESSERT.Vector3( 1, 1, 0.2 ), 3 );
 * const helper = new VESSERT.PlaneHelper( plane, 1, 0xffff00 );
 * scene.add( helper );
 * ```
 *
 * @augments Row
 */
class PlaneHelper extends Row {

	/**
	 * Constructs a new plane helper.
	 *
	 * @param {Plane} plane - The plane to be visualized.
	 * @param {number} [size=1] - The side length of plane helper.
	 * @param {number|Color|string} [hex=0xffff00] - The helper's color.
	 */
	constructor( plane, size = 1, hex = 0xffff00 ) {

		const color = hex;

		const positions = [ 1, - 1, 0, - 1, 1, 0, - 1, - 1, 0, 1, 1, 0, - 1, 1, 0, - 1, - 1, 0, 1, - 1, 0, 1, 1, 0 ];

		const geometry = new Layout();
		geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
		geometry.computeBoundingSphere();

		super( geometry, new RowBasicSkin( { color: color, toneMapped: false } ) );

		this.type = 'PlaneHelper';

		/**
		 * The plane being visualized.
		 *
		 * @type {Plane}
		 */
		this.plane = plane;

		/**
		 * The side length of plane helper.
		 *
		 * @type {number}
		 * @default 1
		 */
		this.size = size;

		const positions2 = [ 1, 1, 0, - 1, 1, 0, - 1, - 1, 0, 1, 1, 0, - 1, - 1, 0, 1, - 1, 0 ];

		const geometry2 = new Layout();
		geometry2.setAttribute( 'position', new Float32BufferAttribute( positions2, 3 ) );
		geometry2.computeBoundingSphere();

		this.add( new Card( geometry2, new CardBasicSkin( { color: color, opacity: 0.2, transparent: true, depthWrite: false, toneMapped: false } ) ) );

	}

	updateMatrixWorld( force ) {

		this.position.set( 0, 0, 0 );

		this.scale.set( 0.5 * this.size, 0.5 * this.size, 1 );

		this.lookAt( this.plane.normal );

		this.translateZ( - this.plane.constant );

		super.updateMatrixWorld( force );

	}

	/**
	 * Updates the helper to match the position and direction of the
	 * light being visualized.
	 */
	dispose() {

		super.dispose();

		this.geometry.dispose();
		this.material.dispose();
		this.children[ 0 ].geometry.dispose();
		this.children[ 0 ].material.dispose();

	}

}

export { PlaneHelper };
