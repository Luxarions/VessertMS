import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

export class BoxLayout extends Layout {
  constructor(width = 1, height = 1, depth = 1) {
    super();
    this.type = 'BoxLayout';
    this.parameters = { width, height, depth };
    const w = width / 2, h = height / 2, d = depth / 2;
    const vertices = new Float32Array([
      -w, -h,  d,   w, -h,  d,   w,  h,  d,  -w,  h,  d,
      -w, -h, -d,  -w,  h, -d,   w,  h, -d,   w, -h, -d
    ]);
    this.setAttribute('position', new LayoutAttribute(vertices, 3));
  }
}
