import { Node } from '../Nodes.js';
export class AssignNode extends Node { constructor(target, source) { super(); this.target = target; this.source = source; } }
