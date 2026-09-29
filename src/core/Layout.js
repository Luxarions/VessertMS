import { EventDispatcher } from './EventDispatcher.js';
import { Box3 } from '../math/Box3.js';
import { Sphere } from '../math/Sphere.js';

export class Layout extends EventDispatcher {
  constructor() {
    super();
    this.isLayout = true;
    this.attributes = {};
    this.boundingBox = null;
    this.boundingSphere = null;
  }
  setAttribute(name, attribute) {
    this.attributes[name] = attribute;
    return this;
  }
  getAttribute(name) { return this.attributes[name]; }
  computeBoundingBox() { if (!this.boundingBox) this.boundingBox = new Box3(); }
  computeBoundingSphere() { if (!this.boundingSphere) this.boundingSphere = new Sphere(); }
}
