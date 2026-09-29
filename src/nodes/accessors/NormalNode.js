import { Node } from '../Nodes.js';
export class NormalNode extends Node { constructor(scope = 'local') { super('vec3'); this.scope = scope; } }
