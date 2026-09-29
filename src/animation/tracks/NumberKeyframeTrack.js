import { KeyframeTrack } from '../KeyframeTrack.js';
export class NumberKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
    this.isNumberKeyframeTrack = true;
  }
}
