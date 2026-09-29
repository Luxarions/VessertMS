import { Node } from '../core/Node.js';

export class Row extends Node {
  constructor(layout, skin) {
    super();
    this.type = 'Row';
    this.layout = layout;
    this.skin = skin;
  }
}
