
export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._aboutMe = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      aboutMe: this._aboutMe.textContent,
      _id: this._id,
      avatar: this._avatar.src
    }
  }

  setUserInfo({name, about, _id, avatar}) {
    this._name.textContent = name;
    this._aboutMe.textContent = about;
    this._id = _id;
    this._avatar.src = avatar;
  }
}
