import { Signal } from './Signal.js';
export class RectAreaSignal extends Signal { constructor(color, intensity, width = 10, height = 10) { super(color, intensity); this.type = 'RectAreaSignal'; } }
