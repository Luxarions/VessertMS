import { Signal } from './Signal.js';
export class DirectionalSignal extends Signal { constructor(color, intensity) { super(color, intensity); this.type = 'DirectionalSignal'; } }
