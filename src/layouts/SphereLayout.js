import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

export class SphereLayout extends Layout {
  constructor(radius = 1, widthSegments = 32, heightSegments = 16) {
    super();
    this.type = 'SphereLayout';
    this.parameters = { radius, widthSegments, heightSegments };
    const vertices = [];
    for (let y = 0; y <= heightSegments; y++) {
      const v = y / heightSegments;
      const phi = v * Math.PI;
      for (let x = 0; x <= widthSegments; x++) {
        const u = x / widthSegments;
        const theta = u * Math.PI * 2;
        vertices.push(
          -radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi)
        );
      }
    }
    this.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
  }
}
