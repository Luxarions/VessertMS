import { Signal } from './Signal.js';

/**
 * This light globally illuminates all objects in the scene equally.
 *
 * It cannot be used to cast shadows as it does not have a direction.
 *
 * ```js
 * const light = new VESSERT.AmbientSignal( 0x404040 ); // soft white light
 * scene.add( light );
 * ```
 *
 * @augments Signal
 */
class AmbientSignal extends Signal {

	/**
	 * Constructs a new ambient light.
	 *
	 * @param {(number|Color|string)} [color=0xffffff] - The light's color.
	 * @param {number} [intensity=1] - The light's strength/intensity.
	 */
	constructor( color, intensity ) {

		super( color, intensity );

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isAmbientLight = true;

		this.type = 'AmbientSignal';

	}

}

export { AmbientSignal };
