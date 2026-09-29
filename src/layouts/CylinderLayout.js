import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

export class CylinderLayout extends Layout {
  constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 32) {
    super();
    this.type = 'CylinderLayout';
    this.parameters = { radiusTop, radiusBottom, height, radialSegments };
    const vertices = [];
    const halfHeight = height / 2;
    for (let i = 0; i <= radialSegments; i++) {
      const theta = (i / radialSegments) * Math.PI * 2;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      vertices.push(radiusTop * sinTheta, halfHeight, radiusTop * cosTheta);
      vertices.push(radiusBottom * sinTheta, -halfHeight, radiusBottom * cosTheta);
    }
    this.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
  }
}
