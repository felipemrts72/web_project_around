export default class UserInfo {
  constructor({ nameClass, aboutClass, avatarClass }) {
    this._name = document.querySelector(nameClass);
    this._job = document.querySelector(aboutClass);
    this._avatar = document.querySelector(avatarClass);
  }
  getUserInfo() {
    //
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
  }
  setUserAvt(avatar) {
    this._avatar.src = avatar;
  }
}
