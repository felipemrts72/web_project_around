export default class Section {
  constructor({ items, renderer }, cardsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  renderItems() {
    this._clearContainer();

    for (const item of this._items) {
      this._renderer(item);
    }
  }

  addItem(item) {
    this._container.prepend(item);
  }
  _clearContainer() {
    this._container.innerHTML = "";
  }
}
