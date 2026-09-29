import { Node } from '../core/Node.js';
import { CardLayout } from '../layouts/CardLayout.js';
import { CardBasicSkin } from '../skins/CardBasicSkin.js';

export class Card extends Node {
  constructor(layout = new CardLayout(), skin = new CardBasicSkin()) {
    super();
    this.type = 'Card';
    this.layout = layout;
    this.skin = skin;
  }
  raycast(raycaster, intersects) {
    // Intersect card layout
  }
}
