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
  //Fechar quando clicar fora do formulário.
  overlay.addEventListener("click", (event) => {
    popup.classList.remove("popup_opened");
    overlay.classList.remove("popup-overlay_opened");
  });
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

/* <--------------------  CARTÕES BASE --------------------> */
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

// ------------------------------- Adiciona cartão ---------------------------------------------
const cardsContainer = document.querySelector(".cards"); //Seleciona uma div sem conteudo
const createTitle = document.querySelector("#titulo");
const createLink = document.querySelector("#link");
const submitButton = document.querySelector("#add-submit");
const addPopup = document.querySelector(".add-popup");

function addNewCard(event) {
  event.preventDefault();
  const addCard = createCard({
    name: createTitle.value,
    link: createLink.value,
  });
  cardsContainer.prepend(addCard);
  createTitle.value = "";
  createLink.value = "";
}

function createCard(card) {
  const cardTemplete = document.querySelector("#cards-template").content; //Seleciona o template e já pega seu conteudo (content)
  const cardElement = cardTemplete
    .querySelector(".cards__item")
    .cloneNode(true); //Clona o template
  cardElement.querySelector(".cards__title").textContent = card.name;
  cardElement.querySelector(".cards__image").setAttribute("src", card.link);
  cardElement
    .querySelector(".cards__trash")
    .addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    });
  cardElement
    .querySelector(".cards__like")
    .addEventListener("click", (event) => {
      cardElement
        .querySelector(".cards__like")
        .classList.toggle("cards__like_active");
    });

  //ZOOM
  cardElement
    .querySelector(".cards__image")
    .addEventListener("click", (event) => {
      const zoomCard = document.querySelector(".cards__zoom");
      const zoomCardImage = document.querySelector(".cards__zoom-image");
      const zoomCardText = document.querySelector(".cards__zoom-title");
      zoomCard.classList.add("cards__zoom_open");
      zoomCardImage.setAttribute("src", card.link);
      zoomCardText.textContent = card.name;
      overlay.classList.add("popup-overlay_opened");

      //Fecha a img
      const closeImg = () => {
        zoomCard.classList.remove("cards__zoom_open");
        overlay.classList.remove("popup-overlay_opened");
      };

      document
        .querySelector(".cards__zoom-close")
        .addEventListener("click", (event) => {
          closeImg();
        });
      overlay.addEventListener("click", (event) => {
        closeImg();
      });
      //Fecha a imagem pelo ESC
      document.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          closeImg();
        }
      });
    });

  closeLocal();

  return cardElement; //retorna o templete com os dados atualizados
}

for (const card of initialCards) {
  const addCard = createCard(card);
  cardsContainer.prepend(addCard);
}

submitButton.addEventListener("click", addNewCard);

//Abre o add-popup

const addPopupButton = document.querySelector(".header__add");

function openLocal(data) {
  addPopup.classList.add("add-popup_opened");
  overlay.classList.add("popup-overlay_opened");
  createTitle.value = "";
  createLink.value = "";
  overlay.addEventListener("click", (evt) => {
    addPopup.classList.remove("add-popup_opened");
    overlay.classList.remove("popup-overlay_opened");
  });
  submitButton.setAttribute("disabled", true);
  submitButton.classList.add("form__submit_type_disabled");
}

addPopupButton.addEventListener("click", openLocal);

// -------------------- Fechar o add-popup --------------------
const closeAddPopupButton = document.querySelector(".add-popup__close");

function closeLocal() {
  addPopup.classList.remove("add-popup_opened");
  overlay.classList.remove("popup-overlay_opened");
}
closeAddPopupButton.addEventListener("click", closeLocal);
