const popup = document.querySelector(".popup");
const overlay = document.querySelector(".popup-overlay");
const userName = document.querySelector("#name");
const userAbout = document.querySelector("#about");
const nameEdit = document.querySelector(".header__title");
const addPopup = document.querySelector(".add-popup");
const aboutEdit = document.querySelector(".header__subtitle");

export const editButton = document.querySelector(".header__edit-button");
export const closeButton = document.querySelector(".popup__close");
export const popupForm = document.querySelector(".popup__form");
export const cardsContainer = document.querySelector(".cards"); //Seleciona uma div sem conteudo
export const createTitle = document.querySelector("#titulo");
export const createLink = document.querySelector("#link");
export const submitButton = document.querySelector("#add-submit");
export const addPopupButton = document.querySelector(".header__add");
export const closeAddPopupButton = document.querySelector(".add-popup__close");
export const initialCards = [
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

export function openPopup() {
  popup.classList.add("popup_opened");
  overlay.classList.add("popup-overlay_opened");
  //quando abrir, vir com as informações
  userName.value = nameEdit.textContent;
  userAbout.value = aboutEdit.textContent;
  //Fechar quando clicar fora do formulário.
  overlay.addEventListener("click", closePopups);
}

export function closePopups() {
  popup.classList.remove("popup_opened");
  overlay.classList.remove("popup-overlay_opened");
  addPopup.classList.remove("add-popup_opened");
}

export function editPopup(evt) {
  evt.preventDefault();
  //Trás o nome e o subtitulo para o formulário
  nameEdit.textContent = userName.value;
  aboutEdit.textContent = userAbout.value;
  //salvar o popup
  closePopups();
}

export function zoomImage(event) {
  const imgTarget = event.target;
  const zoomCard = document.querySelector(".cards__zoom");
  const zoomCardImage = document.querySelector(".cards__zoom-image");
  const zoomCardText = document.querySelector(".cards__zoom-title");
  zoomCard.classList.add("cards__zoom_open");
  zoomCardImage.setAttribute("src", imgTarget.src);
  zoomCardText.textContent = imgTarget
    .closest(".cards__item")
    .querySelector(".cards__title").textContent;
  overlay.classList.add("popup-overlay_opened");

  //Fecha a img
  const closeImg = () => {
    zoomCard.classList.remove("cards__zoom_open");
    overlay.classList.remove("popup-overlay_opened");
  };
  document
    .querySelector(".cards__zoom-close")
    .addEventListener("click", closeImg);
  overlay.addEventListener("click", closeImg);
  //Fecha a imagem pelo ESC
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeImg();
    }
  });
}

export function openLocal(data) {
  addPopup.classList.add("add-popup_opened");
  overlay.classList.add("popup-overlay_opened");
  createTitle.value = "";
  createLink.value = "";
  overlay.addEventListener("click", closePopups);
  submitButton.setAttribute("disabled", true);
  submitButton.classList.add("form__submit_type_disabled");
}
