import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmDel from '../components/PopupWithConfirmDel.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import {
  gallerySelector,
  aboutMeSelector,
  nameSelector,
  popupViewImageSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  nameInputPopUpEdit,
  aboutMeInputPopUpEdit,
  settings,
  popupUpdateAvatarSelector,
  profileAvatar
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
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'd817b37d-3c2f-4c18-8fee-8838126da6ff',
    'Content-Type': 'application/json'
  }
});
const userInfo = new UserInfo({ nameSelector, aboutMeSelector});
const popupImage = new PopupWithImage(popupViewImageSelector);
const popupDelCard = new PopupWithConfirmDel({
  submit: (target) => {
    api.delCard(target).then(() => {
      popupDelCard.close();
    });
  }
}, '.popup-del-card');
let gallerySection;

api.getProfile()
  .then(resolve => resolve.json())
  .then(json => {
    profileAvatar.src = json.avatar;
    userInfo.setUserInfo(json)
  });

api.getInitialCards()
  .then(json => {
    gallerySection = new Section({
      items: json,
      renderer: (cardData) => {
        const card = new Card(cardData,{
          activeUser: userInfo.getUserInfo()._id,
          handleCardClick: () => {
            popupImage.open(cardData);
          },
          handleCardDel: (target) => {
            popupDelCard.open(target);
          },
          handleLike: (id) => {
            if(card.checkUserLike()) {
              api.delLikes(id).then(res => {
                card.setLikes(res.likes);
              });
            } else {
              api.addLikes(id).then(res => {
                card.setLikes(res.likes);
              });
            }
          }
        }, '#gallery__item');
        return card.generateCard();
      }
    }, gallerySelector);
    gallerySection.renderItems();
  });

const popupUpdateAvatar = new PopupWithForm({
  submit: (formData) => {
    popupUpdateAvatar.enableWaitingResponse('Сохранение...');
    api.updateAvatar(formData['avatar'])
      .then(json => {
        profileAvatar.src = json.avatar;
        popupUpdateAvatar.disableWaitingResponse();
        popupUpdateAvatar.close();
      });
  }
}, popupUpdateAvatarSelector);
const popupEditProfile = new PopupWithForm({
  submit: (formData) => {
    popupEditProfile.enableWaitingResponse('Сохранение...');
    api.editProfile({name: formData['name'], about: formData['about-me']})
      .then(json => {
        userInfo.setUserInfo(json);
        popupEditProfile.disableWaitingResponse();
        popupEditProfile.close();
      });
  }
}, popupEditProfileSelector);
const popupAddCard = new PopupWithForm({
  submit: (formData) => {
    popupAddCard.enableWaitingResponse('Сохранение...');
    api.addCard({
      name: formData['add-card-name'],
      link: formData['add-card-url'],
    }).then(json => {
      gallerySection.addItem(json);
      popupAddCard.disableWaitingResponse();
      popupAddCard.close();
    });
  }
}, popupAddCardSelector);

document.querySelector('.profile__avatar').addEventListener('click', () => {
  formValidators['popup-update-avatar'].resetValidation();
  popupUpdateAvatar.open();
});
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

enableValidation(settings);
