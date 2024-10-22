import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupClass, submitCallBack }) {
    super({ popupClass });
    this._popup = popupClass;
    this._popupElement = document.querySelector(this._popup);
    this._closeBtn = this._popupElement.querySelector(".add-popup__close");

    this._sbmtCB = submitCallBack;
    this._form = this._popupElement.querySelector("#cards-form");
  }

  _getInputValues() {
    this._title = this._form.querySelector("#titulo").value;
    this._link = this._form.querySelector("#link").value;

    return { name: this._title, link: this._link };
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
