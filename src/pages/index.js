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
  aboutSelector,
  nameSelector,
  popupViewImageSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  settings,
  popupUpdateAvatarSelector,
  avatarSelector
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
let gallerySection;
const userInfo = new UserInfo({ nameSelector, aboutSelector, avatarSelector});
const popupImage = new PopupWithImage(popupViewImageSelector);
const popupDelCard = new PopupWithConfirmDel({
  submit: (target, element) => {
    api.delCard(target).then(() => {
      gallerySection.delItem(element);
      popupDelCard.close();
    }).catch((err) => console.log(err));
  }
}, '.popup-del-card');


Promise.all([api.getProfile(), api.getInitialCards()])
  .then(values => {
    userInfo.setUserInfo(values[0]);
    gallerySection = new Section({
      items: values[1],
      renderer: (cardData) => {
        const card = new Card(cardData,{
          activeUser: userInfo.getUserInfo()._id,
          handleCardClick: () => {
            popupImage.open(cardData);
          },
          handleCardDel: (target, element) => {
            popupDelCard.open(target, element);
          },
          handleLike: (id) => {
            if(card.checkUserLike()) {
              api.delLikes(id).then(res => {
                card.setLikes(res.likes);
              }).catch((err) => console.log(err));
            } else {
              api.addLikes(id).then(res => {
                card.setLikes(res.likes);
              }).catch((err) => console.log(err));
            }
          }
        }, '#gallery__item');
        return card.generateCard();
      }
    }, gallerySelector);
    gallerySection.renderItems();
  }).catch((err) => console.log(err));

const popupUpdateAvatar = new PopupWithForm({
  submit: (formData) => {
    popupUpdateAvatar.enableWaitingResponse('????????????????????...');
    api.updateAvatar(formData['avatar'])
      .then(json => {
        userInfo.setUserInfo(json);
        popupUpdateAvatar.close();
      }).catch((err) => console.log(err))
        .finally(() => {
          popupUpdateAvatar.disableWaitingResponse();
        });
  }
}, popupUpdateAvatarSelector);
const popupEditProfile = new PopupWithForm({
  submit: (formData) => {
    popupEditProfile.enableWaitingResponse('????????????????????...');
    api.editProfile({name: formData['name'], about: formData['about']})
      .then(json => {
        userInfo.setUserInfo(json);
        popupEditProfile.close();
      }).catch((err) => console.log(err))
      .finally(() => {
        popupEditProfile.disableWaitingResponse();
      });
  }
}, popupEditProfileSelector);
const popupAddCard = new PopupWithForm({
  submit: (formData) => {
    popupAddCard.enableWaitingResponse('????????????????????...');
    api.addCard({
      name: formData['add-card-name'],
      link: formData['add-card-url'],
    }).then(json => {
      gallerySection.addItem(json);
      popupAddCard.close();
    }).catch((err) => console.log(err))
      .finally(() => {
        popupAddCard.disableWaitingResponse();
      });
  }
}, popupAddCardSelector);

document.querySelector('.profile__avatar').addEventListener('click', () => {
  formValidators['popup-update-avatar'].resetValidation();
  popupUpdateAvatar.open();
});
document.querySelector(".profile__edit-btn").addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  popupEditProfile.setInputValues({name:user.name, about: user.aboutMe});
  formValidators['popup-edit-profile'].resetValidation();
  popupEditProfile.open();
});
document.querySelector(".profile__add-btn").addEventListener('click', () => {
  formValidators['popup-add-card'].resetValidation();
  popupAddCard.open();
});
enableValidation(settings);
