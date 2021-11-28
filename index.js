let formElement = document.querySelector(".popup__container");
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', togglePopUp);

let nameInput = formElement.querySelector("#name");
let aboutMeInput = formElement.querySelector("#about-me");

let profileName = document.querySelector(".profile__name");
let profileAboutMe = document.querySelector(".profile__about-me");

let editButton = document.querySelector(".profile__edit-btn");
editButton.addEventListener("click", togglePopUp);
editButton.addEventListener("click", popUpUpdate);

let closePopUp = document.querySelector(".popup__close-btn");
closePopUp.addEventListener("click", togglePopUp);

function togglePopUp() {
  let popUp = document.querySelector(".popup");
  popUp.classList.toggle("popup_opened");
}

function popUpUpdate() {
  nameInput.value = document.querySelector(".profile__name").textContent;
  aboutMeInput.value = document.querySelector(".profile__about-me").textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = formElement.querySelector("#name").value;
  profileAboutMe.textContent = formElement.querySelector("#about-me").value;
}
