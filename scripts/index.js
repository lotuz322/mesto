const initialCards = [
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
const galleryItemTemplate = document.querySelector('#gallery__item').content.querySelector('.photo-gallery__item');
const gallery = document = document.querySelector('.photo-gallery');
initialCards.forEach(item => renderCard(item.name, item.link, item.alt));

const popUpEditProfile = document.querySelector('.popup-edit-profile');
const nameInputPopUpEdit = popUpEditProfile.querySelector('#name');
const aboutMeInputPopUpEdit = popUpEditProfile.querySelector('#about-me');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
popUpEditProfile.querySelector('.popup__container').addEventListener('submit', evt => {
  evt.preventDefault();
  togglePopUp(popUpEditProfile);
  profileName.textContent = nameInputPopUpEdit.value;
  profileAboutMe.textContent = aboutMeInputPopUpEdit.value;
});

const popUpAddCard = document.querySelector('.popup-add-card');
const nameInputPopUpAddCard = popUpAddCard.querySelector('#add-card-name');
const urlInputPopUpAddCard = popUpAddCard.querySelector('#add-card-url');
popUpAddCard.querySelector('.popup__container').addEventListener('submit', (evt) => {
  evt.preventDefault();
  togglePopUp(popUpAddCard);
  renderCard(nameInputPopUpAddCard.value, urlInputPopUpAddCard.value, nameInputPopUpAddCard.value);
});

const popUpViewImage = document.querySelector('.popup-view-image');
const srcPopUpViewImage = popUpViewImage.querySelector('.popup__image');
const paragraphPopUpViewImage = popUpViewImage.querySelector('.popup__paragraph');

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

function addCard(name, link, alt) {
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

function renderCard(name, link, alt) {
  gallery.prepend(addCard(name, link, alt));
}

