
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._rendererItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._rendererItems.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }
}
