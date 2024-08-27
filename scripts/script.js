//fazer o Popup aparecer
const editButton = document.querySelector(".header__edit-button");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".popup-overlay");

// Para mostrar o nome que já está definido nos inputs
const userName = document.querySelector("#name");
const userAbout = document.querySelector("#about");
const nameEdit = document.querySelector(".header__title");
const aboutEdit = document.querySelector(".header__subtitle");
const popupTitle = document.querySelector(".popup__title");

function openPopup() {
  popup.classList.add("popup_opened");
  overlay.classList.add("popup-overlay_opened");
  //quando abrir, vir com as informações
  userName.value = nameEdit.textContent;
  userAbout.value = aboutEdit.textContent;
}
editButton.addEventListener("click", openPopup);

// fechar o popup
const closeButton = document.querySelector(".popup__close");

function closePopup() {
  popup.classList.remove("popup_opened");
  overlay.classList.remove("popup-overlay_opened");
}
closeButton.addEventListener("click", closePopup);

// editar o popup (fazer o titulo e subtitulo do header mudar para o que o usuário colocar no input do popup)
const popupForm = document.querySelector(".popup__form");

function editPopup(evt) {
  evt.preventDefault();
  //Trás o nome e o subtitulo para o formulário
  nameEdit.textContent = userName.value;
  aboutEdit.textContent = userAbout.value;
  //salvar o popup
  popup.classList.remove("popup_opened");
  overlay.classList.remove("popup-overlay_opened");
}

popupForm.addEventListener("submit", editPopup);

/* <---------------------------------------- SECTION CARDS ---------------------------------------> */

/* <-------------------- ADICIONANDO CARTÕES BASE --------------------> */
const initialCards = [
  //Cartões base
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Função que lê o objeto com os cartões-base
function createCard(initialCards) {
  const cardTemplete = document.querySelector("#cards-template").content; //Seleciona o template e já pega seu conteudo (content)
  const cardElement = cardTemplete
    .querySelector(".cards__item")
    .cloneNode(true); //Clona o template
  cardElement.querySelector(".cards__title").textContent = initialCards.name; //Aqui está definindo os titulos do templete como o indice "name"
  cardElement.querySelector(".cards__image").src = initialCards.link; //Aqui está definindo as imagems do templete como o indice "link" que tem as fotos base

  return cardElement; //retorna o templete com os dados atualizados
}

const cardsContainer = document.querySelector(".cards"); //Seleciona uma div sem conteudo
const card = createCard(initialCards); //define o cartão como a função que pega os indices desse objeto

initialCards.forEach((card) => {
  //essa função diz: para cada cartão (função initialCards) que for true (tiver os indices para adicionar)....
  const cardElement = createCard(card); //será criado um cartão, e...
  cardsContainer.prepend(cardElement); //Será adicionado no primeiro lugar do conteiner que vai armazenar os cartões
});

//Abre o add-popup

const addPopupButton = document.querySelector(".header__add");
const addPopup = document.querySelector(".add-popup");
const createTitle = document.querySelector("#titulo");
const createLink = document.querySelector("#link");

function openLocal() {
  addPopup.classList.add("add-popup_opened");
  overlay.classList.add("popup-overlay_opened");
  createTitle.value = "";
  createLink.value = "";
}

addPopupButton.addEventListener("click", openLocal);

// -------------------- Fechar o add-popup --------------------
const closeAddPopupButton = document.querySelector(".add-popup__close");

function closeLocal() {
  addPopup.classList.remove("add-popup_opened");
  overlay.classList.remove("popup-overlay_opened");
}
closeAddPopupButton.addEventListener("click", closeLocal);

// -------------------- Criar um novo cartão de local! --------------------
const createPopupForm = document.querySelector(".add-popup__form");

function createLocal(evt) {
  evt.preventDefault();
  const cardTemplete = document.querySelector("#cards-template").content; //Seleciona o template e já pega seu conteudo (content)
  const cardElement = cardTemplete
    .querySelector(".cards__item")
    .cloneNode(true); //Clona o template

  cardElement.querySelector(".cards__title").textContent = createTitle.value;
  cardElement.querySelector(".cards__image").src = createLink.value;
  cardElement
    .querySelector(".cards__trash")
    .addEventListener("click", (evt) => {
      evt.target.parentElement.parentElement.remove();
    });
  cardsContainer.prepend(cardElement);

  addPopup.classList.remove("add-popup_opened");
  overlay.classList.remove("popup-overlay_opened");
  return cardElement;
  // removeFun();
}

createPopupForm.addEventListener("submit", createLocal);

// -------------------- Remover um local --------------------

function rmvItem(evt) {
  evt.target.parentElement.parentElement.remove();
}

function removeFun() {
  let removeButton = document.querySelectorAll(".cards__trash");
  removeCard = Array.from(removeButton);

  for (const rmvButton of removeCard) {
    rmvButton.addEventListener("click", rmvItem);
  }
}
removeFun();
