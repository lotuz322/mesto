import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './default-value.js';
import { settings } from './validator-settings.js';

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

const validatorAddCard = new FormValidator(settings, document.forms['popup-add-card']);
const validatorEditProfile =  new FormValidator(settings, document.forms['popup-edit-profile']);

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

  validatorEditProfile.toggleButtonState();

  togglePopUp(popUpEditProfile);
});

popUpAddCard.querySelector('.popup__container').addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard({
    name: nameInputPopUpAddCard.value,
    alt: nameInputPopUpAddCard.value,
    link: urlInputPopUpAddCard.value
  });

  validatorAddCard.toggleButtonState();

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

document.querySelectorAll(".popup__close-btn").forEach(buttonElement => {
  buttonElement.addEventListener('click', (evt) => {
    togglePopUp(evt.target.closest('.popup'));
  });
});

initialCards.forEach(item => renderCard(item));
validatorAddCard.enableValidation();
validatorEditProfile.enableValidation();


