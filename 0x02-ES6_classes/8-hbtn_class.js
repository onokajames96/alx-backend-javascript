export default class HolbertonClass {
  constructor(size, location) {
    this._size = size;
    this._location = location;
  }

  // methods

  [Symbol.toPrimitive](type) {
    if (type === 'string') return this._location;
    return this._size;
  }
}
