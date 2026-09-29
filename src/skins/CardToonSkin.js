import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

export class CardToonSkin extends Skin {
  constructor(parameters = {}) {
    super();
    this.type = 'CardToonSkin';
    this.color = new Color(parameters.color !== undefined ? parameters.color : 0xffffff);
  }
}
