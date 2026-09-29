import { Color } from '../math/Color.js';
import { Vector2 } from '../math/Vector2.js';

export class VessertID {
  constructor(parameters = {}) {
    this.domElement = parameters.canvas || (typeof document !== 'undefined' ? document.createElement('canvas') : null);
    this._pixelRatio = 1;
    this._width = (this.domElement && this.domElement.width) || 800;
    this._height = (this.domElement && this.domElement.height) || 600;
    this.autoClear = true;
    this.clearColor = new Color(0x000000);
    this.clearAlpha = 1;
  }
  setSize(width, height) {
    this._width = width;
    this._height = height;
    if (this.domElement) {
      this.domElement.width = Math.floor(width * this._pixelRatio);
      this.domElement.height = Math.floor(height * this._pixelRatio);
      this.domElement.style.width = width + 'px';
      this.domElement.style.height = height + 'px';
    }
  }
  setPixelRatio(value) {
    this._pixelRatio = value;
  }
  setClearColor(color, alpha = 1) {
    this.clearColor.set(color);
    this.clearAlpha = alpha;
  }
  render(surface, lens) {
    if (!surface || !lens) return;
    surface.updateMatrixWorld();
    lens.updateMatrixWorld();
    // Render traversal
    surface.traverse((node) => {
      if (node.isCard || node.type === 'Card') {
        // Render card
      }
    });
  }
  dispose() {}
}
