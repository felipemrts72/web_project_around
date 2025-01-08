import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupClass, submitCallBack }) {
    super({ popupClass });
    this._popup = popupClass;
    this._popupElement = document.querySelector(this._popup);
    this._sbmtCB = submitCallBack;

    this._form = this._popupElement.querySelector(".form");
  }

  _getInputValues() {
    if (this._popup == "#add-card") {
      this._title = this._form.querySelector("#titulo").value;
      this._link = this._form.querySelector("#link").value;

      return { name: this._title, link: this._link };
    } else if (this._popup == "#info-update") {
      this._name = this._form.querySelector("#name-input").value;
      this._about = this._form.querySelector("#about-input").value;

      return { name: this._name, about: this._about };
    } else {
      this._avatar = this._form.querySelector("#avatar-input").value;
      return this._avatar;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._sbmtCB(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
