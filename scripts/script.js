//fazer o Popup aparecer
const editButton = document.querySelector(".header__edit-button");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".popup-overlay");

// Para mostrar o nome que já está definido nos inputs
const userName = document.querySelector("#name");
const userAbout = document.querySelector("#about");
const nameEdit = document.querySelector(".header__title");
const aboutEdit = document.querySelector(".header__subtitle");

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
