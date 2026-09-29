import { Curve } from '../core/Curve.js';
export class CubicBezierCurve extends Curve {
  constructor() {
    super();
    this.isCubicBezierCurve = true;
  }
}
