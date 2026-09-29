import { Signal } from './Signal.js';

export class AmbientSignal extends Signal {
  constructor(color, intensity) {
    super(color, intensity);
    this.type = 'AmbientSignal';
  }
}
