export const ESC_CODE = 'Escape';

export const popupViewImageSelector = '.popup-view-image';
export const popupUpdateAvatarSelector = '.popup-update-avatar';
export const popupAddCardSelector = '.popup-add-card';

export const popupEditProfileSelector = '.popup-edit-profile';
const popUpEditProfile = document.querySelector(popupEditProfileSelector);
export const nameInputPopUpEdit = popUpEditProfile.querySelector('#name');
export const aboutMeInputPopUpEdit = popUpEditProfile.querySelector('#about-me');

export const nameSelector = '.profile__name';
export const aboutMeSelector = '.profile__about-me';

export const gallerySelector = '.photo-gallery';
export const profileAvatar = document.querySelector('.profile__avatar-img');


export const settings = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
}
