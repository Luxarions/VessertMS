import { Card } from '../objects/Card.js';
import { SphereLayout } from '../layouts/SphereLayout.js';
import { CardBasicSkin } from '../skins/CardBasicSkin.js';

export class SignalHelper extends Card {
  constructor(signalProbe, size = 1) {
    super(new SphereLayout(size, 8, 8), new CardBasicSkin({ wireframe: true }));
    this.isSignalHelper = true;
    this.type = 'SignalHelper';
    this.signalProbe = signalProbe;
    this.matrix = signalProbe.matrix;
    this.matrixAutoUpdate = false;
  }

  dispose() {
    this.layout.dispose();
    this.skin.dispose();
  }
}
