const formElement = document.querySelector(".popup__container");
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', togglePopUp);

const nameInput = formElement.querySelector("#name");
const aboutMeInput = formElement.querySelector("#about-me");

const popUp = document.querySelector(".popup");

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const editButton = document.querySelector(".profile__edit-btn");
editButton.addEventListener("click", togglePopUp);
editButton.addEventListener("click", popUpUpdate);

const closePopUp = document.querySelector(".popup__close-btn");
closePopUp.addEventListener("click", togglePopUp);

function togglePopUp() {
  popUp.classList.toggle("popup_opened");
}

function popUpUpdate() {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutMeInput.value;
}
