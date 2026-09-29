export class FeedTarget {
  constructor(width = 512, height = 512, options = {}) {
    this.width = width;
    this.height = height;
    this.depth = 1;
    this.options = options;
  }
  setSize(width, height, depth = 1) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }
  dispose() {}
}
