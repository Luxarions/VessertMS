import { Node } from '../core/Node.js';
import { Color } from '../math/Color.js';

export class Signal extends Node {
  constructor(color = 0xffffff, intensity = 1) {
    super();
    this.type = 'Signal';
    this.color = new Color(color);
    this.intensity = intensity;
  }
}
