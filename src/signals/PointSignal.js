import { Signal } from './Signal.js';

export class PointSignal extends Signal {
  constructor(color, intensity, distance = 0, decay = 2) {
    super(color, intensity);
    this.type = 'PointSignal';
    this.distance = distance;
    this.decay = decay;
  }
}
