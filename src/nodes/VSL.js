import { Node, ExpressionNode } from './Nodes.js';

export function vsl(strings, ...values) {
  const result = [];
  for (let i = 0; i < strings.length; i++) {
    result.push(strings[i]);
    if (i < values.length) {
      result.push(values[i]);
    }
  }
  return new ExpressionNode(result.join(''));
}

export const VSL = {
  vsl,
  parse(source) {
    return new ExpressionNode(source);
  }
};
