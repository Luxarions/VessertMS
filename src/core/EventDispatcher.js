export class EventDispatcher {
  constructor() { this._listeners = {}; }
  addEventListener(type, listener) {
    if (!this._listeners[type]) this._listeners[type] = [];
    if (!this._listeners[type].includes(listener)) this._listeners[type].push(listener);
  }
  removeEventListener(type, listener) {
    if (!this._listeners[type]) return;
    const index = this._listeners[type].indexOf(listener);
    if (index !== -1) this._listeners[type].splice(index, 1);
  }
  dispatchEvent(event) {
    if (!this._listeners[event.type]) return;
    event.target = this;
    const array = this._listeners[event.type].slice(0);
    for (let i = 0; i < array.length; i++) array[i].call(this, event);
  }
}
