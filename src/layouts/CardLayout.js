import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

export class CardLayout extends Layout {
  constructor(width = 1, height = 1, depth = 0.1) {
    super();
    this.type = 'CardLayout';
    this.parameters = { width, height, depth };
    
    const w = width / 2;
    const h = height / 2;
    const d = depth / 2;
    
    const vertices = new Float32Array([
      -w, -h,  d,   w, -h,  d,   w,  h,  d,  -w,  h,  d,
      -w, -h, -d,  -w,  h, -d,   w,  h, -d,   w, -h, -d,
      -w,  h, -d,  -w,  h,  d,   w,  h,  d,   w,  h, -d,
      -w, -h, -d,   w, -h, -d,   w, -h,  d,  -w, -h,  d,
       w, -h, -d,   w,  h, -d,   w,  h,  d,   w, -h,  d,
      -w, -h, -d,  -w, -h,  d,  -w,  h,  d,  -w,  h, -d
    ]);
    
    this.setAttribute('position', new LayoutAttribute(vertices, 3));
    this.computeVertexNormals();
  }
}
