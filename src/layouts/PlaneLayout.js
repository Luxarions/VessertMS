import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

export class PlaneLayout extends Layout {
  constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    super();
    this.type = 'PlaneLayout';
    this.parameters = { width, height, widthSegments, heightSegments };
    const w = width / 2, h = height / 2;
    const vertices = new Float32Array([
      -w,  h, 0,
       w,  h, 0,
      -w, -h, 0,
       w, -h, 0
    ]);
    this.setAttribute('position', new LayoutAttribute(vertices, 3));
    this.setAttribute('uv', new LayoutAttribute(new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]), 2));
  }
}
