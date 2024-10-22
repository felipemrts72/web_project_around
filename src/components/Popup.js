export default class Popup {
  constructor({ popupClass }) {
    this._popup = popupClass;
    this._popupElement = document.querySelector(this._popup);
    this._overlay = document.querySelector(".popup-overlay");
  }
  open() {
    this._popupElement.classList.add("popup_opened");
    this._overlay.classList.add("popup-overlay_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    this._overlay.classList.remove("popup-overlay_opened");
    this._popupElement.classList.remove("cards__zoom_open");
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    console.log(this._popupElement);

    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });
    this._overlay.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
