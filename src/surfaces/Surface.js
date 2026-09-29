import { Node } from '../core/Node.js';
import { Color } from '../math/Color.js';

export class Surface extends Node {
  constructor() {
    super();
    this.type = 'Surface';
    this.background = new Color(0x000000);
    this.environment = null;
    this.ambient = null;
  }
}
