import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './default-value.js';

const ESC_CODE = 'Escape';
const gallery = document.querySelector('.photo-gallery');

const popUpEditProfile = document.querySelector('.popup-edit-profile');
const nameInputPopUpEdit = popUpEditProfile.querySelector('#name');
const aboutMeInputPopUpEdit = popUpEditProfile.querySelector('#about-me');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

const popUpAddCard = document.querySelector('.popup-add-card');
const nameInputPopUpAddCard = popUpAddCard.querySelector('#add-card-name');
const urlInputPopUpAddCard = popUpAddCard.querySelector('#add-card-url');

const closePopupByEsc = (evt) => {
  if(evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    togglePopUp(openedPopup);
  }
}

const closePopupByClick = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if(evt.target.classList.contains('popup')) {
    togglePopUp(openedPopup);
  }
}

export const togglePopUp = (targetPopUp) => {
  if(targetPopUp.classList.contains('popup_opened')) {
    targetPopUp.classList.remove('popup_opened');
    targetPopUp.removeEventListener('mousedown', closePopupByClick);
    document.removeEventListener('keydown', closePopupByEsc);
  } else {
    targetPopUp.classList.add("popup_opened");
    targetPopUp.addEventListener('mousedown', closePopupByClick);
    document.addEventListener('keydown', closePopupByEsc);
  }
}

const renderCard = (data) => {
  const card = new Card(data, '#gallery__item');
  gallery.prepend(card.generateCard());
}

popUpEditProfile.querySelector('.popup__container').addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = nameInputPopUpEdit.value;
  profileAboutMe.textContent = aboutMeInputPopUpEdit.value;

  const buttonElement = popUpEditProfile.querySelector('.popup__submit-btn');
  buttonElement.setAttribute('disabled', '');
  buttonElement.classList.add('popup__submit-btn_disabled');

  togglePopUp(popUpEditProfile);
});

popUpAddCard.querySelector('.popup__container').addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(nameInputPopUpAddCard.value, urlInputPopUpAddCard.value, nameInputPopUpAddCard.value);

  const buttonElement = popUpAddCard.querySelector('.popup__submit-btn');
  buttonElement.setAttribute('disabled', '');
  buttonElement.classList.add('popup__submit-btn_disabled');

  nameInputPopUpAddCard.value = '';
  urlInputPopUpAddCard.value = '';
  togglePopUp(popUpAddCard);
});

document.querySelector(".profile__edit-btn").addEventListener('click', () => {
  nameInputPopUpEdit.value = profileName.textContent;
  aboutMeInputPopUpEdit.value = profileAboutMe.textContent;
  togglePopUp(popUpEditProfile);
});

document.querySelector(".profile__add-btn").addEventListener('click', () => {
  togglePopUp(popUpAddCard);
});

Array.from(document.querySelectorAll(".popup__close-btn")).forEach(buttonElement => {
  buttonElement.addEventListener('click', (evt) => {
    togglePopUp(evt.target.closest('.popup'));
  });
});

initialCards.forEach(item => renderCard(item));

Array.from(document.querySelectorAll('.popup__container_type_form')).forEach(formElement => {
  const form = new FormValidator({
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
  }, formElement);
  form.enableValidation();
});
