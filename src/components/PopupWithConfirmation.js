import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupClass, submitCallBack }) {
    super({ popupClass });
    this._popupElement = document.querySelector(popupClass);
    this._sbmtCB = submitCallBack;

    this._form = this._popupElement.querySelector(".form");
  }
}
