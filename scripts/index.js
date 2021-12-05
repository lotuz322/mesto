const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const galleryItemTemplate = document.querySelector('#gallery__item').content.querySelector('.photo-gallery__item');
const gallery = document = document.querySelector('.photo-gallery');
initialCards.forEach(item => addCard(item.name, item.link));

const popUpEditProfile = document.querySelector(".popup-edit-profile");
const nameInputPopUpEdit = popUpEditProfile.querySelector("#name");
const aboutMeInputPopUpEdit = popUpEditProfile.querySelector("#about-me");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
popUpEditProfile.querySelector(".popup__container").addEventListener('submit', evt => {
  evt.preventDefault();
  togglePopUp(popUpEditProfile);
  profileName.textContent = nameInputPopUpEdit.value;
  profileAboutMe.textContent = aboutMeInputPopUpEdit.value;
});

const popUpAddCard = document.querySelector(".popup-add-card");
const nameInputPopUpAddCard = popUpAddCard.querySelector("#add-card-name");
const urlInputPopUpAddCard = popUpAddCard.querySelector("#add-card-url");
popUpAddCard.querySelector(".popup__container").addEventListener('submit', (evt) => {
  evt.preventDefault();
  togglePopUp(popUpAddCard);
  addCard(nameInputPopUpAddCard.value, urlInputPopUpAddCard.value);
});

document.querySelector(".profile__edit-btn").addEventListener('click', () => {
  nameInputPopUpEdit.value = profileName.textContent;
  aboutMeInputPopUpEdit.value = profileAboutMe.textContent;
  togglePopUp(popUpEditProfile);
});

document.querySelector(".profile__add-btn").addEventListener('click', () => {
  togglePopUp(popUpAddCard);
});

document.querySelectorAll(".popup__close-btn")
  .forEach(item => item.addEventListener('click', evt => {
    togglePopUp(evt.target.closest('.popup'))}));

function togglePopUp(targetPopUp) {
  targetPopUp.classList.toggle("popup_opened");
}

function addCard(name, link) {
  const galleryItemElement = galleryItemTemplate.cloneNode(true);
  galleryItemElement.querySelector('.photo-gallery__image').src = link;
  galleryItemElement.querySelector('.photo-gallery__name').textContent = name;
  gallery.prepend(galleryItemElement);
}
