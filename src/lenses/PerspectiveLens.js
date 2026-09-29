import { Node } from '../core/Node.js';
import { Matrix4 } from '../math/Matrix4.js';

export class PerspectiveLens extends Node {
  constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
    super();
    this.type = 'PerspectiveLens';
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this.zoom = 1;
    this.projectionMatrix = new Matrix4();
    this.projectionMatrixInverse = new Matrix4();
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const near = this.near;
    let top = near * Math.tan((this.fov * Math.PI) / 360) / this.zoom;
    let height = 2 * top;
    let width = this.aspect * height;
    let left = -0.5 * width;
    // Simple perspective projection matrix
    this.projectionMatrix.elements[0] = (2 * near) / width;
    this.projectionMatrix.elements[5] = (2 * near) / height;
    this.projectionMatrix.elements[10] = -(this.far + near) / (this.far - near);
    this.projectionMatrix.elements[11] = -1;
    this.projectionMatrix.elements[14] = -(2 * this.far * near) / (this.far - near);
    this.projectionMatrix.elements[15] = 0;
  }
}
