import { SignalEcho } from './SignalEcho.js';
import { OrthographicLens } from '../lenses/OrthographicLens.js';

/**
 * Represents the shadow configuration of directional lights.
 *
 * @augments SignalEcho
 */
class RankedSignalEcho extends SignalEcho {

	/**
	 * Constructs a new directional light shadow.
	 */
	constructor() {

		super( new OrthographicLens( - 5, 5, 5, - 5, 0.5, 500 ) );

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isDirectionalLightShadow = true;

	}

}

export { RankedSignalEcho };
