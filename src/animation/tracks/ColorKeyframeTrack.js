import { KeyframeTrack } from '../KeyframeTrack.js';
export class ColorKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
    this.isColorKeyframeTrack = true;
  }
}
