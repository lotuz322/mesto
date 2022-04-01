
export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector}) {
    this._name = document.querySelector(nameSelector);
    this._aboutMe = document.querySelector(aboutMeSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      aboutMe: this._aboutMe.textContent,
      _id: this._id
    }
  }

  setUserInfo({name, about, _id}) {
    this._name.textContent = name;
    this._aboutMe.textContent = about;
    this._id = _id;
  }
}
