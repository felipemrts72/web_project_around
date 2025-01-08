import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupClass, submitCallBack }) {
    super({ popupClass });
    this._popupElement = document.querySelector(popupClass);
    this._sbmtCB = submitCallBack;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    const popupConfirmation = this._popupElement.querySelector(
      "#confirmation-submit"
    );

    popupConfirmation.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._sbmtCB(this._card).then(() => {
        this.close();
      });
    });
  }
}
