import { KeyframeTrack } from '../KeyframeTrack.js';
export class StringKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
    this.isStringKeyframeTrack = true;
  }
}
