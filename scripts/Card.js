import {togglePopUp} from './index.js';
const popUpViewImage = document.querySelector('.popup-view-image');
const srcPopUpViewImage = popUpViewImage.querySelector('.popup__image');
const paragraphPopUpViewImage = popUpViewImage.querySelector('.popup__paragraph');

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  _handleRemoveCard() {
    this._element.remove();
  }

  _handleLike() {
    this._element.querySelector('.photo-gallery__like-btn')
      .classList.toggle('photo-gallery__like-btn_active');
  }

  _handleOpenPopup() {
    togglePopUp(popUpViewImage);
    srcPopUpViewImage.src = this._link;
    srcPopUpViewImage.alt = this._alt;
    paragraphPopUpViewImage.textContent = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-gallery__delete-btn').addEventListener('click', () => {
      this._handleRemoveCard();
    });

    this._element.querySelector('.photo-gallery__like-btn').addEventListener('click', () => {
      this._handleLike();
    });

    this._element.querySelector('.photo-gallery__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photo-gallery__name').textContent = this._name;
    const imageElement = this._element.querySelector('.photo-gallery__image');
    imageElement.src = this._link;
    imageElement.alt = this._alt;

    return this._element;
  }
}
