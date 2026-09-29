import { Node } from '../Nodes.js';
export class CameraNode extends Node { constructor(scope = 'position') { super('vec3'); this.scope = scope; } }
