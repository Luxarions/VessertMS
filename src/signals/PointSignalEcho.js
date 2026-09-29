import { SignalEcho } from './SignalEcho.js';
import { PerspectiveLens } from '../lenses/PerspectiveLens.js';

/**
 * Represents the shadow configuration of point lights.
 *
 * @augments SignalEcho
 */
class PointSignalEcho extends SignalEcho {

	/**
	 * Constructs a new point light shadow.
	 */
	constructor() {

		super( new PerspectiveLens( 90, 1, 0.5, 500 ) );

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isPointLightShadow = true;

	}

}

export { PointSignalEcho };
