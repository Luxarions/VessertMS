import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

export class CardStandardSkin extends Skin {
  constructor(parameters = {}) {
    super();
    this.type = 'CardStandardSkin';
    this.color = new Color(parameters.color !== undefined ? parameters.color : 0xffffff);
    this.roughness = parameters.roughness !== undefined ? parameters.roughness : 1.0;
    this.metalness = parameters.metalness !== undefined ? parameters.metalness : 0.0;
  }
}
