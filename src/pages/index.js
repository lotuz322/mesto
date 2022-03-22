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
  popupEditProfileSelector,
  nameInputPopUpEdit,
  aboutMeInputPopUpEdit,
  initialCards,
  settings
} from '../utils/constants.js';

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

const userInfo = new UserInfo({ nameSelector, aboutMeSelector});

const gallerySection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card({
      name: cardData.name,
      link: cardData.link,
      alt: cardData.alt,
      handleCardClick: () => {
        popupImage.open(cardData);
      }
    }, '#gallery__item');
    return card.generateCard();
  }
}, gallerySelector);

const popupImage = new PopupWithImage(popupViewImageSelector);
const popupEditProfile = new PopupWithForm({
  submit: (formData) => {
    userInfo.setUserInfo({name: formData['name'], aboutMe: formData['about-me']});
    popupEditProfile.close();
  }
}, popupEditProfileSelector);
const popupAddCard = new PopupWithForm({
  submit: (formData) => {
    gallerySection.addItem({
      name: formData['add-card-name'],
      link: formData['add-card-url'],
      alt: formData['add-card-name']
    });
    popupAddCard.close();
  }
}, popupAddCardSelector);

document.querySelector(".profile__edit-btn").addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  nameInputPopUpEdit.value = user.name;
  aboutMeInputPopUpEdit.value = user.aboutMe;
  formValidators['popup-edit-profile'].resetValidation();
  popupEditProfile.open();
});
document.querySelector(".profile__add-btn").addEventListener('click', () => {
  formValidators['popup-add-card'].resetValidation();
  popupAddCard.open();
});

gallerySection.renderItems();
enableValidation(settings);
