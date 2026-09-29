import { WGPUBackend } from './WGPUBackend.js';

export class WGPURenderer {
  constructor(parameters = {}) {
    this.backend = new WGPUBackend(parameters);
    this.domElement = parameters.canvas || (typeof document !== 'undefined' ? document.createElement('canvas') : null);
  }
  async init() {
    return await this.backend.init();
  }
  render(surface, lens) {
    this.backend.render(surface, lens);
  }
}
