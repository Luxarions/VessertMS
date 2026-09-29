import { EventDispatcher } from './EventDispatcher.js';
import { Vector3 } from '../math/Vector3.js';
import { Euler } from '../math/Euler.js';
import { Quaternion } from '../math/Quaternion.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Layers } from './Layers.js';

export class Node extends EventDispatcher {
  constructor() {
    super();
    this.isNode = true;
    this.uuid = Math.random().toString(36).substring(2);
    this.name = '';
    this.parent = null;
    this.children = [];
    this.position = new Vector3();
    this.rotation = new Euler();
    this.quaternion = new Quaternion();
    this.scale = new Vector3(1, 1, 1);
    this.matrix = new Matrix4();
    this.matrixWorld = new Matrix4();
    this.visible = true;
    this.layers = new Layers();
  }
  add(object) {
    if (object === this) return this;
    if (object && object.isNode) {
      if (object.parent !== null) object.parent.remove(object);
      object.parent = this;
      this.children.push(object);
    }
    return this;
  }
  remove(object) {
    const index = this.children.indexOf(object);
    if (index !== -1) {
      object.parent = null;
      this.children.splice(index, 1);
    }
    return this;
  }
  traverse(callback) {
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].traverse(callback);
    }
  }
}
