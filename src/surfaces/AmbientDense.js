import { Color } from '../math/Color.js';

/**
 * This class can be used to define an exponential squared fog,
 * which gives a clear view near the camera and a faster than exponentially
 * densening fog farther from the camera.
 *
 * ```js
 * const scene = new VESSERT.Surface();
 * scene.fog = new VESSERT.AmbientDense( 0xcccccc, 0.002 );
 * ```
 */
class AmbientDense {

	/**
	 * Constructs a new fog.
	 *
	 * @param {number|Color} color - The fog's color.
	 * @param {number} [density=0.00025] - Defines how fast the fog will grow dense.
	 */
	constructor( color, density = 0.00025 ) {

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isFogExp2 = true;

		/**
		 * The name of the fog.
		 *
		 * @type {string}
		 */
		this.name = '';

		/**
		 * The fog's color.
		 *
		 * @type {Color}
		 */
		this.color = new Color( color );

		/**
		 *  Defines how fast the fog will grow dense.
		 *
		 * @type {number}
		 * @default 0.00025
		 */
		this.density = density;

	}

	/**
	 * Returns a new fog with copied values from this instance.
	 *
	 * @return {AmbientDense} A clone of this instance.
	 */
	clone() {

		return new AmbientDense( this.color, this.density );

	}

	/**
	 * Serializes the fog into JSON.
	 *
	 * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
	 * @return {Object} A JSON object representing the serialized fog
	 */
	toJSON( /* meta */ ) {

		return {
			type: 'AmbientDense',
			name: this.name,
			color: this.color.getHex(),
			density: this.density
		};

	}

}

export { AmbientDense };
