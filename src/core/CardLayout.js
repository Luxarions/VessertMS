import { EventDispatcher } from './EventDispatcher.js';
import { Box3 } from '../math/Box3.js';
import { Sphere } from '../math/Sphere.js';
import { Vector3 } from '../math/Vector3.js';

let _layoutId = 0;

export class CardLayout extends EventDispatcher {
  constructor() {
    super();
    this.isCardLayout = true;
    this.id = _layoutId++;
    this.uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);
    this.name = '';
    this.type = 'CardLayout';

    this.attributes = {};
    this.index = null;

    this.boundingBox = null;
    this.boundingSphere = null;

    this.drawRange = { start: 0, count: Infinity };
    this.userData = {};
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    if (Array.isArray(index)) {
      this.index = new (this.attributes.position && this.attributes.position.count > 65535 ? Uint32Array : Uint16Array)(index);
    } else {
      this.index = index;
    }
    return this;
  }

  setAttribute(name, attribute) {
    this.attributes[name] = attribute;
    return this;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  deleteAttribute(name) {
    delete this.attributes[name];
    return this;
  }

  hasAttribute(name) {
    return this.attributes[name] !== undefined;
  }

  computeBoundingBox() {
    if (this.boundingBox === null) {
      this.boundingBox = new Box3();
    }
    const position = this.attributes.position;
    if (position !== undefined) {
      this.boundingBox.setFromPoints(position);
    } else {
      this.boundingBox.makeEmpty();
    }
  }

  computeBoundingSphere() {
    if (this.boundingSphere === null) {
      this.boundingSphere = new Sphere();
    }
    const position = this.attributes.position;
    if (position !== undefined) {
      this.boundingSphere.setFromPoints(position);
    } else {
      this.boundingSphere.makeEmpty();
    }
  }

  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}
