import Popup from "./Popup";

export default class PopupWithConfirmDel extends Popup {
  constructor({ submit },popupSelector) {
    super(popupSelector);
    this._submit = (evt) => {
      evt.preventDefault();
      submit(this._target, this._element);
    };
  }
  open(target, element) {
    this._target = target;
    this._element = element;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popup.removeEventListener('submit', this._submit);
  }
}
