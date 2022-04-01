export default class Card {
  constructor(cardData, {activeUser, handleCardClick, handleCardDel, handleLike}, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.name;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._activeUser = activeUser;
    this._owner = this._activeUser === cardData.owner._id;
    this._handleCardClick = () => {
      handleCardClick();
    }
    this._handleCardDel = () => {
      handleCardDel(this._id);
    }
    this._handleLike = () => {
      handleLike(this._id);
    }
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

  _updateLikes() {
    if(this.checkUserLike()) {
      this._likeButton.classList.add('photo-gallery__like-btn_active');
    } else {
      this._likeButton.classList.remove('photo-gallery__like-btn_active');
    }
    this._likesCounter.textContent = this._likes.length;
  }

  _setEventListeners() {
    if(this._owner) {
      this._deleteButton.addEventListener('click', this._handleCardDel);
    }
    this._likeButton.addEventListener('click', this._handleLike);
    this._imageElement.addEventListener('click', this._handleCardClick);

  }

  checkUserLike() {
    return typeof this._likes.find((item) => item._id === this._activeUser) !== 'undefined';
  }

  setLikes(likes) {
    this._likes = likes;
    this._updateLikes();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-gallery__like-btn');
    this._likesCounter = this._element.querySelector('.photo-gallery__like-counter');
    this._deleteButton =  this._element.querySelector('.photo-gallery__delete-btn');
    if(!this._owner) {
      this._deleteButton.remove();
    }
    this._likesCounter.textContent = this._likes.length;
    this._element.querySelector('.photo-gallery__name').textContent = this._name;
    this._imageElement = this._element.querySelector('.photo-gallery__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._alt;
    this._updateLikes();
    this._setEventListeners();
    return this._element;
  }
}
