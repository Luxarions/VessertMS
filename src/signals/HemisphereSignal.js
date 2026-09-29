import { Signal } from './Signal.js';
export class HemisphereSignal extends Signal { constructor(skyColor, groundColor, intensity) { super(skyColor, intensity); this.type = 'HemisphereSignal'; } }
