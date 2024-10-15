export default class Section {
  constructor({ items, renderer }, config) {
    this._items = items;
    this._renderer = renderer;
    this._container = config.containerSelector;
  }

  setItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();

    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
