import { Signal } from './Signal.js';
export class RankedSignal extends Signal { constructor(color, intensity) { super(color, intensity); this.type = 'RankedSignal'; } }
