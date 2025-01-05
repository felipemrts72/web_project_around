import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  editButton,
  cardsContainer,
  cardSubmit,
  addPopupButton,
  initialCards,
  profileSubmit,
} from "../components/utils.js";

//-------------------------- Instância de API.js --------------------------

const api = new Api({
  url: "https://around-api.pt-br.tripleten-services.com/v1/",
  headers: {
    authorization: "3c87efb4-b08f-40d5-9262-3c16a56d0588",
    "Content-Type": "application/json",
  },
});

// -------------------------- Pega dos dados do Usúario no Servidor -------------------------

api.getData("users/me").then((res) => console.log(res));

// -------------------------- Abre imagem ao clicar -------------------------
const imgPopup = new PopupWithImage({ popupClass: ".cards__zoom" });

function handleCardClick(evt) {
  imgPopup.open(evt.target);
}

//---------------------------------------------------------------

function renderCards(card) {
  const addCard = new Card({
    cardSeletor: "#cards-template",
    card,
    handleCardClick,
  }).createCard();
  section.addItem(addCard);
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderCards,
  },
  cardsContainer
);

section.renderItems();

// -------------------- Valida o formulário --------------------
const profileValidator = new FormValidator(
  {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_type_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
    fieldsetClass: "fieldset",
  },
  "#profile-form"
);

const cardValidator = new FormValidator(
  {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_type_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
    fieldsetClass: "fieldset",
  },
  "#cards-form"
);

// -------------------- Editar o perfil | Profile Edit ----------------------------
const userData = new UserInfo({ userNameClass: "#name", userJobClass: "#job" });
const openProfile = new Popup({ popupClass: ".popup" });

editButton.addEventListener("click", () => {
  openProfile.open();
  userData.getUserInfo();
  profileValidator.enableValidation();
});

// Envia os dados colocados pelo o usuário para o perfil | Sends data entered by the user

profileSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  userData.setUserInfo();
  openProfile.close();
});

//---------------------------------------------------------------

//-------------------- Formulário adicionar cartões -------------------------

const formPopup = new PopupWithForm({
  popupClass: ".add-popup",
  submitCallBack: (data) => {
    const addCard = new Card({
      cardSeletor: "#cards-template",
      card: {
        name: data.name,
        link: data.link,
      },
      handleCardClick,
    }).createCard();
    section.addItem(addCard);
  },
});

const openCardPopup = () => {
  formPopup.open();
  cardValidator.enableValidation();
};

// Abre o popup de cartões | Open cards-popup
addPopupButton.addEventListener("click", openCardPopup);

// Envia os dados do cartão e o adiciona na seção

cardSubmit.addEventListener("submit", () => {
  formPopup.submitPopup();
});
