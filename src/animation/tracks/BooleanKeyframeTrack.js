import { KeyframeTrack } from '../KeyframeTrack.js';
export class BooleanKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
    this.isBooleanKeyframeTrack = true;
  }
}
