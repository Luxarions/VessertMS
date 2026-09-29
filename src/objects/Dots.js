import { Node } from '../core/Node.js';

export class Dots extends Node {
  constructor(layout, skin) {
    super();
    this.type = 'Dots';
    this.layout = layout;
    this.skin = skin;
  }
}
