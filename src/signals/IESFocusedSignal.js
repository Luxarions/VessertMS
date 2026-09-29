import { Signal } from './Signal.js';
export class IESFocusedSignal extends Signal { constructor(color, intensity) { super(color, intensity); this.type = 'IESFocusedSignal'; } }
