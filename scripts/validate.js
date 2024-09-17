// ---------- Adiciona a mensagem de erro ----------

function addErrorMessage(data, input) {
  const fieldsetElement = input.closest(data.fieldsetClass);
  const fieldsetBlock = Array.from(fieldsetElement.children);
  const span = fieldsetBlock[1];
  span.textContent = `${input.validationMessage}`;
  span.classList.add(data.errorClass);
}

// ---------- Remove a mensagem de erro ----------
function removeErrorMessage(data, input) {
  const fieldsetElement = input.closest(data.fieldsetClass);
  const fieldsetBlock = Array.from(fieldsetElement.children);
  const span = fieldsetBlock[1];
  span.textContent = ``;
  span.classList.remove(data.errorClass);
}

// ---------- Verifica se o input é válido ----------
function checkIsValid(data, event) {
  const input = event.target;
  const isValid = input.validity.valid;

  if (!isValid) {
    input.classList.add(data.inputErrorClass);
    disableSubmit(data, input);
    addErrorMessage(data, input);
  } else {
    input.classList.remove(data.inputErrorClass);
    enableSubmit(data, input);
    removeErrorMessage(data, input);
  }
}

// ---------- Faz com que o Botão se torne ativo ----------
const enableSubmit = (data, input) => {
  const form = input.closest(data.formSelector);
  const submitBtn = form.querySelector(data.submitButtonSelector);
  submitBtn.removeAttribute("disabled");
  submitBtn.classList.remove(data.inactiveButtonClass);
};

// ---------- Faz com que o Botão se torne inativo ----------
const disableSubmit = (data, input) => {
  const form = input.closest(data.formSelector);
  const submitBtn = form.querySelector(data.submitButtonSelector);
  submitBtn.setAttribute("disabled", true);
  submitBtn.classList.add(data.inactiveButtonClass);
};

// ---------- Seleciona todos os inputs ----------
function enableValidation(data) {
  const inputs = Array.from(document.querySelectorAll(data.inputSelector));
  for (const input of inputs) {
    input.addEventListener("input", (evt) => {
      checkIsValid(data, evt);
    });
  }
}

// ---------- Configurações dos formulários ----------
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_type_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
  fieldsetClass: "fieldset",
});

//Fecha os popups pelo ESC

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeLocal();
    closePopup();
  }
});
