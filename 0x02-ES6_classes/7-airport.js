export default class Airport {
  constructor(name, code) {
    // Create objs
    this._code = code;
    this._name = name;
  }

  get [Symbol.toStringTag]() {
    return `${this._code}`;
  }
}
