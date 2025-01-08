export default class Section {
  constructor({ items, renderer }, cardsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  renderItems() {
    this._clearContainer();

    this._items.forEach((card) => {
      this._renderer(card);
    });
  }

  setItem(item) {
    this._container.prepend(item);
  }
  _clearContainer() {
    this._container.innerHTML = "";
  }
}
