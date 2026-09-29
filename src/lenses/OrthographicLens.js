import { Node } from '../core/Node.js';
import { Matrix4 } from '../math/Matrix4.js';
export class OrthographicLens extends Node { constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2000) { super(); this.type = 'OrthographicLens'; this.projectionMatrix = new Matrix4(); } }
