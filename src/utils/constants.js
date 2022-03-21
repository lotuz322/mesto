export const ESC_CODE = 'Escape';

export const popupViewImageSelector = '.popup-view-image';

export const popupAddCardSelector = '.popup-add-card';

export const popupEditProfileSelector = '.popup-edit-profile';
const popUpEditProfile = document.querySelector(popupEditProfileSelector);
export const nameInputPopUpEdit = popUpEditProfile.querySelector('#name');
export const aboutMeInputPopUpEdit = popUpEditProfile.querySelector('#about-me');

export const nameSelector = '.profile__name';
export const aboutMeSelector = '.profile__about-me';

export const gallerySelector = '.photo-gallery';

export const initialCards = [
  {
    name: 'Архыз',
    alt: 'Горы Архыза',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    alt: 'Река в Челябинской области',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    alt: 'Бетонные джунгли Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    alt: 'Горы Камчатки',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    alt: 'Леса холмогорского района',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    alt: 'Озеро Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const settings = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
}
