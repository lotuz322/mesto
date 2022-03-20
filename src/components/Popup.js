import {ESC_CODE} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-btn');
    this._handleClickButton = this._handleClickButton.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if(evt.key === ESC_CODE) {
      this.close();
    }
  }

  _handleClickClose(evt) {
    console.log(evt);
    if(evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleClickButton(evt) {

    this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
    this._closeButton.addEventListener('click', this._handleClickButton);
  }

  removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
    this._closeButton.removeEventListener('click', this._handleClickButton);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }
}
