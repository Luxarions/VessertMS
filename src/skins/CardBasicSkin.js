import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

export class CardBasicSkin extends Skin {
  constructor(parameters = {}) {
    super();
    this.type = 'CardBasicSkin';
    this.color = new Color(parameters.color !== undefined ? parameters.color : 0xffffff);
    this.media = parameters.media || null;
    this.wireframe = !!parameters.wireframe;
    if (parameters.opacity !== undefined) this.opacity = parameters.opacity;
    if (parameters.transparent !== undefined) this.transparent = parameters.transparent;
  }
}
