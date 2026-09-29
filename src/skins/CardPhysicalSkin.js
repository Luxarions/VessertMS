import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

export class CardPhysicalSkin extends Skin {
  constructor(parameters = {}) {
    super();
    this.type = 'CardPhysicalSkin';
    this.color = new Color(parameters.color !== undefined ? parameters.color : 0xffffff);
    this.roughness = parameters.roughness !== undefined ? parameters.roughness : 0.5;
    this.metalness = parameters.metalness !== undefined ? parameters.metalness : 0.5;
    this.clearcoat = parameters.clearcoat !== undefined ? parameters.clearcoat : 0.0;
    this.transmission = parameters.transmission !== undefined ? parameters.transmission : 0.0;
    this.ior = parameters.ior !== undefined ? parameters.ior : 1.5;
  }
}
