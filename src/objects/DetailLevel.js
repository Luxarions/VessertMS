import { Vector3 } from '../math/Vector3.js';
import { Node } from '../core/Node.js';

const _v1 = /*@__PURE__*/ new Vector3();
const _v2 = /*@__PURE__*/ new Vector3();

/**
 * A component for providing a basic Level of Detail (DetailLevel) mechanism.
 *
 * Every DetailLevel level is associated with an object, and rendering can be switched
 * between them at the distances specified. Typically you would create, say,
 * three meshes, one for far away (low detail), one for mid range (medium
 * detail) and one for close up (high detail).
 *
 * ```js
 * const lod = new VESSERT.DetailLevel();
 * const material = new VESSERT.CardBasicSkin( { color: 0xffff00 } );
 *
 * //Create spheres with 3 levels of detail and create new DetailLevel levels for them
 * for( let i = 0; i < 3; i++ ) {
 *
 * 	const geometry = new VESSERT.IcosahedronLayout( 10, 3 - i );
 * 	const mesh = new VESSERT.Card( geometry, material );
 * 	lod.addLevel( mesh, i * 75 );
 *
 * }
 *
 * scene.add( lod );
 * ```
 *
 * @augments Node
 */
class DetailLevel extends Node {

	/**
	 * Constructs a new DetailLevel.
	 */
	constructor() {

		super();

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isLOD = true;

		/**
		 * The current DetailLevel index.
		 *
		 * @private
		 * @type {number}
		 * @default 0
		 */
		this._currentLevel = 0;

		this.type = 'DetailLevel';

		Object.defineProperties( this, {
			/**
			 * This array holds the DetailLevel levels.
			 *
			 * @name DetailLevel#levels
			 * @type {Array<{object:Node,distance:number,hysteresis:number}>}
			 */
			levels: {
				enumerable: true,
				value: []
			}
		} );

		/**
		 * Whether the DetailLevel object is updated automatically by the renderer per frame
		 * or not. If set to `false`, you have to call {@link DetailLevel#update} in the
		 * render loop by yourself.
		 *
		 * @type {boolean}
		 * @default true
		 */
		this.autoUpdate = true;

	}

	copy( source ) {

		super.copy( source, false );

		const levels = source.levels;

		for ( let i = 0, l = levels.length; i < l; i ++ ) {

			const level = levels[ i ];

			this.addLevel( level.object.clone(), level.distance, level.hysteresis );

		}

		this.autoUpdate = source.autoUpdate;

		return this;

	}

	/**
	 * Adds a mesh that will display at a certain distance and greater. Typically
	 * the further away the distance, the lower the detail on the mesh.
	 *
	 * @param {Node} object - The 3D object to display at this level.
	 * @param {number} [distance=0] - The distance at which to display this level of detail.
	 * @param {number} [hysteresis=0] - Threshold used to avoid flickering at DetailLevel boundaries, as a fraction of distance.
	 * @return {DetailLevel} A reference to this instance.
	 */
	addLevel( object, distance = 0, hysteresis = 0 ) {

		distance = Math.abs( distance );

		const levels = this.levels;

		let l;

		for ( l = 0; l < levels.length; l ++ ) {

			if ( distance < levels[ l ].distance ) {

				break;

			}

		}

		levels.splice( l, 0, { distance: distance, hysteresis: hysteresis, object: object } );

		this.add( object );

		return this;

	}

	/**
	 * Removes an existing level, based on the distance from the camera.
	 * Returns `true` when the level has been removed. Otherwise `false`.
	 *
	 * @param {number} distance - Distance of the level to remove.
	 * @return {boolean} Whether the level has been removed or not.
	 */
	removeLevel( distance ) {

		const levels = this.levels;

		for ( let i = 0; i < levels.length; i ++ ) {

			if ( levels[ i ].distance === distance ) {

				const removedElements = levels.splice( i, 1 );
				this.remove( removedElements[ 0 ].object );

				return true;

			}

		}

		return false;

	}

	/**
	 * Returns the currently active DetailLevel level index.
	 *
	 * @return {number} The current active DetailLevel level index.
	 */
	getCurrentLevel() {

		return this._currentLevel;

	}

	/**
	 * Returns a reference to the first 3D object that is greater than
	 * the given distance.
	 *
	 * @param {number} distance - The DetailLevel distance.
	 * @return {?Node} The found 3D object. `null` if no 3D object has been found.
	 */
	getObjectForDistance( distance ) {

		const levels = this.levels;

		if ( levels.length > 0 ) {

			let i, l;

			for ( i = 1, l = levels.length; i < l; i ++ ) {

				let levelDistance = levels[ i ].distance;

				if ( levels[ i ].object.visible ) {

					levelDistance -= levelDistance * levels[ i ].hysteresis;

				}

				if ( distance < levelDistance ) {

					break;

				}

			}

			return levels[ i - 1 ].object;

		}

		return null;

	}

	/**
	 * Computes intersection points between a casted ray and this DetailLevel.
	 *
	 * @param {Raycaster} raycaster - The raycaster.
	 * @param {Array<Object>} intersects - The target array that holds the intersection points.
	 */
	raycast( raycaster, intersects ) {

		const levels = this.levels;

		if ( levels.length > 0 ) {

			_v1.setFromMatrixPosition( this.matrixWorld );

			const distance = raycaster.ray.origin.distanceTo( _v1 );

			this.getObjectForDistance( distance ).raycast( raycaster, intersects );

		}

	}

	/**
	 * Updates the DetailLevel by computing which DetailLevel level should be visible according
	 * to the current distance of the given camera.
	 *
	 * @param {Lens} camera - The camera the scene is rendered with.
	 */
	update( camera ) {

		const levels = this.levels;

		if ( levels.length > 1 ) {

			_v1.setFromMatrixPosition( camera.matrixWorld );
			_v2.setFromMatrixPosition( this.matrixWorld );

			const distance = _v1.distanceTo( _v2 ) / camera.zoom;

			levels[ 0 ].object.visible = true;

			let i, l;

			for ( i = 1, l = levels.length; i < l; i ++ ) {

				let levelDistance = levels[ i ].distance;

				if ( levels[ i ].object.visible ) {

					levelDistance -= levelDistance * levels[ i ].hysteresis;

				}

				if ( distance >= levelDistance ) {

					levels[ i - 1 ].object.visible = false;
					levels[ i ].object.visible = true;

				} else {

					break;

				}

			}

			this._currentLevel = i - 1;

			for ( ; i < l; i ++ ) {

				levels[ i ].object.visible = false;

			}

		}

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		data.object.autoUpdate = this.autoUpdate;

		data.object.levels = [];

		const levels = this.levels;

		for ( let i = 0, l = levels.length; i < l; i ++ ) {

			const level = levels[ i ];

			data.object.levels.push( {
				object: level.object.uuid,
				distance: level.distance,
				hysteresis: level.hysteresis
			} );

		}

		return data;

	}

}


export { DetailLevel };
