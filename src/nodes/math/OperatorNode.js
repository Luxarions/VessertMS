import { Node } from '../Nodes.js';
export class OperatorNode extends Node { constructor(op, a, b) { super(); this.op = op; this.a = a; this.b = b; } }
