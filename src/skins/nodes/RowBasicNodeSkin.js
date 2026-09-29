import NodeMaterial from './NodeMaterial.js';

import { RowBasicSkin } from '../RowBasicSkin.js';

const _defaultValues = /*@__PURE__*/ new RowBasicSkin();

/**
 * Node material version of {@link RowBasicSkin}.
 *
 * @augments NodeMaterial
 */
class LineBasicNodeMaterial extends NodeMaterial {

	static get type() {

		return 'LineBasicNodeMaterial';

	}

	/**
	 * Constructs a new line basic node material.
	 *
	 * @param {Object} [parameters] - The configuration parameter.
	 */
	constructor( parameters ) {

		super();

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isLineBasicNodeMaterial = true;

		this.setDefaultValues( _defaultValues );

		this.setValues( parameters );

	}

}

export default LineBasicNodeMaterial;
