export default class Card {
  constructor({name, link, alt, handleCardClick}, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._handleCardClick = handleCardClick;
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
    this._likeButton.classList.toggle('photo-gallery__like-btn_active');
  }

  _setEventListeners() {
    this._element.querySelector('.photo-gallery__delete-btn').addEventListener('click', () => {
      this._handleRemoveCard();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._element.querySelector('.photo-gallery__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-gallery__like-btn');
    this._setEventListeners();

    this._element.querySelector('.photo-gallery__name').textContent = this._name;
    const imageElement = this._element.querySelector('.photo-gallery__image');
    imageElement.src = this._link;
    imageElement.alt = this._alt;

    return this._element;
  }
}
