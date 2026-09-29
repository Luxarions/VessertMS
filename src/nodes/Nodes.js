export class Node {
  constructor(nodeType = 'void') {
    this.nodeType = nodeType;
    this.isNode = true;
    this.hash = Math.random().toString(36).substring(2, 9);
  }
  build(builder) {
    return builder.format(this.generate(builder), this.getNodeType(builder));
  }
  generate(builder, output) {
    return '';
  }
  getNodeType(builder) {
    return this.nodeType;
  }
}

export class TempNode extends Node {
  constructor(type) {
    super(type);
    this.isTempNode = true;
  }
}

export class ExpressionNode extends Node {
  constructor(snippet = '', nodeType = 'void') {
    super(nodeType);
    this.snippet = snippet;
  }
  generate() {
    return this.snippet;
  }
}
