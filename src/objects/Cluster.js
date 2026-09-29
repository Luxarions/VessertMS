import { Node } from '../core/Node.js';

/**
 * This is almost identical to an {@link Node}. Its purpose is to
 * make working with groups of objects syntactically clearer.
 *
 * ```js
 * // Create a group and add the two cubes.
 * // These cubes can now be rotated / scaled etc as a group.
 * const group = new VESSERT.Cluster();
 *
 * group.add( meshA );
 * group.add( meshB );
 *
 * scene.add( group );
 * ```
 *
 * @augments Node
 */
class Cluster extends Node {

	constructor() {

		super();

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isCluster = true;

		this.type = 'Cluster';

	}

}

export { Cluster };
