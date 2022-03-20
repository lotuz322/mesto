import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  gallerySelector,
  aboutMeSelector,
  nameSelector,
  popupViewImageSelector,
  popupAddCardSelector,
  nameInputPopUpAddCard,
  urlInputPopUpAddCard,
  popupEditProfileSelector,
  nameInputPopUpEdit,
  aboutMeInputPopUpEdit,
  initialCards,
  settings
} from '../utils/constants.js';

const validatorAddCard = new FormValidator(settings, document.forms['popup-add-card']);
const validatorEditProfile =  new FormValidator(settings, document.forms['popup-edit-profile']);

const userInfo = new UserInfo({ nameSelector, aboutMeSelector});

const popupImage = new PopupWithImage(popupViewImageSelector);
const popupEditProfile = new PopupWithForm({
  submit: (evt) => {
    evt.preventDefault();

    const formData = popupEditProfile._getInputValues();
    userInfo.setUserInfo({name: formData['name'], aboutMe: formData['about-me']});

    validatorEditProfile.toggleButtonState();
    popupEditProfile.close();
  }
}, popupEditProfileSelector);
const popupAddCard = new PopupWithForm({
  submit: (evt) => {
    evt.preventDefault();

    const formData = popupAddCard._getInputValues();

    const card = new Card({
      name: formData['add-card-name'],
      alt: formData['add-card-name'],
      link: formData['add-card-url'],
      handleCardClick: () => {
        popupImage.open({
          name: formData['add-card-name'],
          link: formData['add-card-url'],
          alt: formData['add-card-name']
        });
      }
    }, '#gallery__item');
    gallerySection.addItem(card.generateCard());

    validatorAddCard.toggleButtonState();

    nameInputPopUpAddCard.value = '';
    urlInputPopUpAddCard.value = '';
    popupAddCard.close();
  }
}, popupAddCardSelector);

const gallerySection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card({
      name: cardData.name,
      link: cardData.link,
      alt: cardData.alt,
      handleCardClick: () => {
        popupImage.open({
          name: cardData.name,
          link: cardData.link,
          alt: cardData.alt
        });
      }
    }, '#gallery__item');
    gallerySection.addItem(card.generateCard());
  }
}, gallerySelector);

document.querySelector(".profile__edit-btn").addEventListener('click', () => {
  const userInfo = userInfo.getUserInfo();
  nameInputPopUpEdit.value = userInfo.name;
  aboutMeInputPopUpEdit.value = userInfo.aboutMe;

  popupEditProfile.open();
});
document.querySelector(".profile__add-btn").addEventListener('click', () => {
  popupAddCard.open();
});

gallerySection.renderItems();
validatorAddCard.enableValidation();
validatorEditProfile.enableValidation();
