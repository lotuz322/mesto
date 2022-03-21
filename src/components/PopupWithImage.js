import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__image');
    this._textElement = this._popup.querySelector('.popup__paragraph');
  }

  open({name, link, alt}) {
    this._imageElement.src = link;
    this._imageElement.alt = alt;
    this._textElement.textContent = name;
    super.open();
  }
}
