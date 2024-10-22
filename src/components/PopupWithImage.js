import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupClass) {
    super(popupClass);
    this._popupElement = document.querySelector(this._popup);
    this._zoomCardImage = document.querySelector(".cards__zoom-image");
    this._zoomCardText = document.querySelector(".cards__zoom-title");
  }

  open(data) {
    super.open();
    this._popupElement.classList.add("cards__zoom_open");
    this._zoomCardImage.setAttribute("src", data.src);
    this._zoomCardText.textContent = data
      .closest(".cards__item")
      .querySelector(".cards__title").textContent;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(".cards__zoom-closepopup__close")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
