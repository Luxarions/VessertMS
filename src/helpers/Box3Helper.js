import { RowSegments } from '../objects/RowSegments.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { LayoutAttribute, Float32BufferAttribute } from '../core/LayoutAttribute.js';
import { Layout } from '../core/Layout.js';

/**
 * A helper object to visualize an instance of {@link Box3}.
 *
 * ```js
 * const box = new VESSERT.Box3();
 * box.setFromCenterAndSize( new VESSERT.Vector3( 1, 1, 1 ), new VESSERT.Vector3( 2, 1, 3 ) );
 *
 * const helper = new VESSERT.Box3Helper( box, 0xffff00 );
 * scene.add( helper )
 * ```
 *
 * @augments RowSegments
 */
class Box3Helper extends RowSegments {

	/**
	 * Constructs a new box3 helper.
	 *
	 * @param {Box3} box - The box to visualize.
	 * @param {number|Color|string} [color=0xffff00] - The box's color.
	 */
	constructor( box, color = 0xffff00 ) {

		const indices = new Uint16Array( [ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ] );

		const positions = [ 1, 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, - 1, 1, 1, 1, - 1, - 1, 1, - 1, - 1, - 1, - 1, 1, - 1, - 1 ];

		const geometry = new Layout();

		geometry.setIndex( new LayoutAttribute( indices, 1 ) );

		geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );

		super( geometry, new RowBasicSkin( { color: color, toneMapped: false } ) );

		/**
		 * The box being visualized.
		 *
		 * @type {Box3}
		 */
		this.box = box;

		this.type = 'Box3Helper';

		this.geometry.computeBoundingSphere();

	}

	updateMatrixWorld( force ) {

		const box = this.box;

		if ( box.isEmpty() ) return;

		box.getCenter( this.position );

		box.getSize( this.scale );

		this.scale.multiplyScalar( 0.5 );

		super.updateMatrixWorld( force );

	}

	/**
	 * Frees the GPU-related resources allocated by this instance. Call this
	 * method whenever this instance is no longer used in your app.
	 */
	dispose() {

		super.dispose();

		this.geometry.dispose();
		this.material.dispose();

	}

}

export { Box3Helper };
