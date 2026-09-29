import { EventDispatcher } from '../core/EventDispatcher.js';
import { Color } from '../math/Color.js';

export class Skin extends EventDispatcher {
  constructor() {
    super();
    this.id = Math.floor(Math.random() * 1000000);
    this.uuid = Math.random().toString(36).substring(2, 11);
    this.name = '';
    this.type = 'Skin';
    this.color = new Color(0xffffff);
    this.opacity = 1;
    this.transparent = false;
    this.depthTest = true;
    this.depthWrite = true;
    this.visible = true;
    this.version = 0;
  }
  needsUpdate() {
    this.version++;
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}
