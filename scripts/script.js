import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  editButton,
  closeButton,
  popupForm,
  cardsContainer,
  createTitle,
  createLink,
  submitButton,
  addPopupButton,
  closeAddPopupButton,
  initialCards,
  openPopup,
  closePopups,
  editPopup,
  zoomImage,
  openLocal,
} from "./utils.js";

function addNewCard(event) {
  event.preventDefault();
  const addCard = new Card({
    cardSeletor: "#cards-template",
    card: {
      name: createTitle.value,
      link: createLink.value,
    },
    zoomImage,
  }).createCard();
  cardsContainer.prepend(addCard);
  createTitle.value = "";
  createLink.value = "";
  closePopups();
}

// Editar o perfil | Profile Edit
editButton.addEventListener("click", openPopup);

// Fecha o popup | Close profile popup
closeButton.addEventListener("click", closePopups);

// Envia os dados colocados pelo o usuário para o perfil | Sends data entered by the user
popupForm.addEventListener("submit", editPopup);

// Adiciona os cartões base | Adds default cards
for (const card of initialCards) {
  const addCard = new Card({
    cardSeletor: "#cards-template",
    card,
    zoomImage,
  }).createCard();
  cardsContainer.prepend(addCard);
}

// Adiciona o cartão inserido pelo usuário | Adds new card entered by the user
submitButton.addEventListener("click", addNewCard);

// Abre o popup de cartões | Open cards-popup
addPopupButton.addEventListener("click", openLocal);

// Fechar o popup de cartões | Close cards-popup
closeAddPopupButton.addEventListener("click", closePopups);

// -------------------- Valida o formulário --------------------
new FormValidator(
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
).enableValidation();

new FormValidator(
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
).enableValidation();
