import { Node } from '../Nodes.js';
export class CodeNode extends Node { constructor(code = '', includes = []) { super(); this.code = code; this.includes = includes; } }
