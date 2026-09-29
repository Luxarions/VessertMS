import { Node } from '../Nodes.js';
export class PositionNode extends Node { constructor(scope = 'local') { super('vec3'); this.scope = scope; } }
