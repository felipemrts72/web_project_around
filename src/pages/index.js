import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  editButton,
  cardsContainer,
  titleInput,
  linkInput,
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
  section = new Section(
    {
      items: cards,
      renderer: (card) => {
        section.setItem(renderCards(card));
      },
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
    deleteCard: () => {
      delCard.open(card);
    },
    owner: owner,
    likeCard,
    unLikeCard,
  });
  return addCard.createCard();
}

//-------------------- Deleta Cartões -------------------------

const delCard = new PopupWithConfirmation({
  popupClass: "#confirmation-popup",
  submitCallBack: (card) => {
    return api
      .deleteCard(card._id)
      .then((res) => {
        return res.ok;
      })
      .then((res) => {
        if (res) {
          section.renderItems();
        } else {
          return Promise.reject(err);
        }
      })
      .catch((err) => {
        console.log(err); //Validação do Erro
      });
  },
});
delCard.setEventListeners();

//-------------------- Curte Cartão -------------------------

const likeCard = (id) => {
  api.addLike(id).then((res) => {
    return res;
  });
};

//-------------------- Descurte Cartão -------------------------

const unLikeCard = (id) => {
  api.removeLike(id).then((res) => {
    return res;
  });
};

//-------------------- Formulário adicionar cartões -------------------------

const cardPopup = new PopupWithForm({
  popupClass: "#add-card",
  submitCallBack: () => {
    const addCard = {
      name: titleInput.value,
      link: linkInput.value,
      owner: owner,
      createdAt: new Date(),
    };
    api
      .sendCard(addCard)
      .then((res) => {
        cardsContainer.prepend(renderCards(res));
      })
      .catch((err) => {
        console.log(err); //Validação do Erro
      });
  },
});

cardPopup.setEventListeners();

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
