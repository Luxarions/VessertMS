import { Node } from '../core/Node.js';

/**
 * A bone which is part of a {@link BindPoint}. The skeleton in turn is used by
 * the {@link BoundCard}.
 *
 * ```js
 * const root = new VESSERT.Binding();
 * const child = new VESSERT.Binding();
 *
 * root.add( child );
 * child.position.y = 5;
 * ```
 *
 * @augments Node
 */
class Binding extends Node {

	/**
	 * Constructs a new bone.
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
		this.isBone = true;

		this.type = 'Binding';

	}

}

export { Binding };
