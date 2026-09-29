import { Node } from '../core/Node.js';
import { Color } from '../math/Color.js';

/**
 * Abstract base class for lights - all other light types inherit the
 * properties and methods described here.
 *
 * @abstract
 * @augments Node
 */
class Signal extends Node {

	/**
	 * Constructs a new light.
	 *
	 * @param {(number|Color|string)} [color=0xffffff] - The light's color.
	 * @param {number} [intensity=1] - The light's strength/intensity.
	 */
	constructor( color, intensity = 1 ) {

		super();

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isSignal = true;

		this.type = 'Signal';

		/**
		 * The light's color.
		 *
		 * @type {Color}
		 */
		this.color = new Color( color );

		/**
		 * The light's intensity.
		 *
		 * @type {number}
		 * @default 1
		 */
		this.intensity = intensity;

	}

	copy( source, recursive ) {

		super.copy( source, recursive );

		this.color.copy( source.color );
		this.intensity = source.intensity;

		return this;

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		data.object.color = this.color.getHex();
		data.object.intensity = this.intensity;

		return data;

	}

}

export { Signal };
