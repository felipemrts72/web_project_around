import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  editButton,
  cardsContainer,
  cardSubmit,
  addPopupButton,
  profileClasses,
  avatar,
  owner,
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
const userData = new UserInfo(profileClasses);
api.getData("users/me").then((res) => {
  userData.setUserInfo(res);
  userData.setUserAvt(res.avatar);
});

// -------------------- Editar o perfil | Profile Edit ----------------------------

// Informações do Perfil

const profilePopup = new PopupWithForm({
  popupClass: "#info-update",
  submitCallBack: (data) => {
    api.profileEdit(data);
    userData.setUserInfo(data); //Para tornar a experiência do Usúario mais rápida!
  },
});

editButton.addEventListener("click", () => {
  profilePopup.open();
  profileValidator.enableValidation();
});

//---------------------------------------------------------------

// Foto do perfil
const avatarPoup = new PopupWithForm({
  popupClass: "#avatar-update",
  submitCallBack: (url) => {
    console.log(url);

    api.avatarEdit(url);
    userData.setUserAvt(url);
  },
});

avatar.addEventListener("click", () => {
  avatarPoup.open();
});

// -------------------------- Abre imagem ao clicar -------------------------
const imgPopup = new PopupWithImage({ popupClass: ".cards__zoom" });

function handleCardClick(evt) {
  imgPopup.open(evt.target);
}

//---------------------- Recebe os cartões do Servidor -------------------------
let section;

api.getData("cards").then((cards) => {
  console.log(cards);

  section = new Section(
    {
      items: cards,
      renderer: renderCards,
    },
    cardsContainer
  );

  section.renderItems();
});
function renderCards(card) {
  const addCard = new Card({
    cardSeletor: "#cards-template",
    card,
    handleCardClick,
    deleteCard,
    owner: owner,
    likeCard,
    unLikeCard,
  }).createCard();
  section.addItem(addCard);
}

//-------------------- Deleta Cartões -------------------------

function deleteCard(id) {
  api
    .deleteCard(id)
    .then((res) => {
      if (res.status == 200) {
        return null;
      } else {
        return Promise.reject(res.status);
      }
    })
    .catch((error) => {
      console.log(`Error - DELETE - ${error} | CARD ${id}`);
    });
}

//-------------------- Curte Cartão -------------------------

const likeCard = (id) => {
  api.likeOn(id).then((res) => {
    return res;
  });
};

//-------------------- Descurte Cartão -------------------------

const unLikeCard = (id) => {
  api.likeOff(id).then((res) => {
    return res;
  });
};

//-------------------- Formulário adicionar cartões -------------------------

const cardPopup = new PopupWithForm({
  popupClass: "#add-card",
  submitCallBack: (data) => {
    const addCard = new Card({
      cardSeletor: "#cards-template",
      card: {
        name: data.name,
        link: data.link,
      },
      handleCardClick,
      deleteCard,
      likeCard,
      unLikeCard,
      owner: owner,
    }).createCard();

    section.addItem(addCard);
  },
});

const openCardPopup = () => {
  cardPopup.open();
  cardValidator.enableValidation();
};

// Abre o popup de cartões | Open cards-popup
addPopupButton.addEventListener("click", openCardPopup);

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
