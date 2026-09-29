import { Signal } from './Signal.js';
import { Node } from '../core/Node.js';

export class FocusedSignal extends Signal {
  constructor(color, intensity) {
    super(color, intensity);
    this.type = 'FocusedSignal';
    this.target = new Node();
  }
}
