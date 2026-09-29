export class LayoutAttribute {
  constructor(array, itemSize, normalized = false) {
    this.isLayoutAttribute = true;
    this.name = '';
    this.array = array;
    this.itemSize = itemSize;
    this.count = array ? array.length / itemSize : 0;
    this.normalized = normalized;
    this.version = 0;
  }
  set needsUpdate(value) { if (value === true) this.version++; }
}
