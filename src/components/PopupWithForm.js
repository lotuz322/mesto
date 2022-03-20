import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ submit },popupSelector) {
    super(popupSelector);
    this._submit = submit.bind(this);

  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__item');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
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
