export default class UserInfo {
  constructor({ userNameClass, userJobClass }) {
    this._userNameClass = userNameClass;
    this._userJobClass = userJobClass;
    this._nameSelector = document.querySelector(".header__title");
    this._jobSelector = document.querySelector(".header__subtitle");
  }
  getUserInfo() {
    (document.querySelector(this._userNameClass).value =
      this._nameSelector.textContent),
      (document.querySelector(this._userJobClass).value =
        this._jobSelector.textContent);
  }

  setUserInfo() {
    this._nameSelector.textContent = document.querySelector(
      this._userNameClass
    ).value;
    this._jobSelector.textContent = document.querySelector(
      this._userJobClass
    ).value;
  }
}
