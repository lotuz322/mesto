import Popup from "./Popup";

export default class PopupWithConfirmDel extends Popup {
  constructor({ submit },popupSelector) {
    super(popupSelector);
    this._submit = (evt) => {
      evt.preventDefault();
      submit(this._target);
    };
  }
  open(target) {
    this._target = target;
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
