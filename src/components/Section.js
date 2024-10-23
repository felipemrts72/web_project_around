export default class Section {
  constructor({ items, renderer }, cardsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  renderItems() {
    for (const item of this._items) {
      this._renderer(item);
    }
  }

  addItem(element) {
    this._container.prepend(element);
    // console.log(element);
  }
}
