const ESC_CODE =  'Escape';
const galleryItemTemplate = document.querySelector('#gallery__item').content.querySelector('.photo-gallery__item');
const gallery = document = document.querySelector('.photo-gallery');

const popUpEditProfile = document.querySelector('.popup-edit-profile');
const nameInputPopUpEdit = popUpEditProfile.querySelector('#name');
const aboutMeInputPopUpEdit = popUpEditProfile.querySelector('#about-me');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

const popUpAddCard = document.querySelector('.popup-add-card');
const nameInputPopUpAddCard = popUpAddCard.querySelector('#add-card-name');
const urlInputPopUpAddCard = popUpAddCard.querySelector('#add-card-url');

const popUpViewImage = document.querySelector('.popup-view-image');
const srcPopUpViewImage = popUpViewImage.querySelector('.popup__image');
const paragraphPopUpViewImage = popUpViewImage.querySelector('.popup__paragraph');

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

const togglePopUp = (targetPopUp) => {
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

const setPopupEventClose = () => {
  const buttonList = Array.from(document.querySelectorAll(".popup__close-btn"));
  buttonList.forEach(buttonElement => {
    buttonElement.addEventListener('click', (evt) => {
        togglePopUp(evt.target.closest('.popup'));
    });
  });
}

const createCard = (name, link, alt) => {
  const galleryItemElement = galleryItemTemplate.cloneNode(true);
  galleryItemElement.querySelector('.photo-gallery__name').textContent = name;
  galleryItemElement.querySelector('.photo-gallery__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('photo-gallery__like-btn_active')
  });
  galleryItemElement.querySelector('.photo-gallery__delete-btn').addEventListener('click', evt => {
    evt.target.closest('.photo-gallery__item').remove();
  });

  const imageElement = galleryItemElement.querySelector('.photo-gallery__image');
  imageElement.src = link;
  imageElement.alt = alt;
  imageElement.addEventListener('click', () => {
    togglePopUp(popUpViewImage);
    srcPopUpViewImage.src = link;
    srcPopUpViewImage.alt = alt;
    paragraphPopUpViewImage.textContent = name;
  });

  return galleryItemElement;
}

const renderCard = (name, link, alt) => {
  gallery.prepend(createCard(name, link, alt));
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

setPopupEventClose();
initialCards.forEach(item => renderCard(item.name, item.link, item.alt));
