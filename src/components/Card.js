export default class Card {
  constructor({ cardSeletor, card, handleCardClick, deleteCard, owner }) {
    this._cardSeletor = cardSeletor;
    this._card = card;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._owner = owner;
  }
  _getTemplate() {
    const cardTemplete = document
      .querySelector(this._cardSeletor)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardTemplete;
  }

  _removeCard(evt) {
    if ((this._card.owner = this._owner)) {
      evt.target.parentElement.remove();
      this._deleteCard(this._card._id);
    }
  }

  _likeCardToggle() {
    this._element
      .querySelector(".cards__like")
      .classList.toggle("cards__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__trash")
      .addEventListener("click", (evt) => {
        this._removeCard(evt);
      });

    this._element
      .querySelector(".cards__like")
      .addEventListener("click", () => {
        this._likeCardToggle();
      });

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", this._handleCardClick);
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".cards__title").textContent = this._card.name;
    this._element
      .querySelector(".cards__image")
      .setAttribute("src", this._card.link);
    this._setEventListeners();
    return this._element; //retorna o templete com os dados atualizados
  }
}
