export default class FormValidator {
  constructor(data, formSelector) {
    this._data = data;
    this._formSelector = formSelector;
  }

  // ---------- Adiciona a mensagem de erro ----------

  _addErrorMessage() {
    const fieldsetElement = this._input.closest(this._data.fieldsetClass);
    const fieldsetBlock = Array.from(fieldsetElement.children);
    const span = fieldsetBlock[1];
    span.textContent = `${this._input.validationMessage}`;
    span.classList.add(this._data.errorClass);
  }

  // ---------- Remove a mensagem de erro ----------
  _removeErrorMessage() {
    const fieldsetElement = this._input.closest(this._data.fieldsetClass);
    const fieldsetBlock = Array.from(fieldsetElement.children);
    const span = fieldsetBlock[1];
    span.textContent = ``;
    span.classList.remove(this._data.errorClass);
  }

  // ---------- Verifica se o input é válido ----------
  _checkIsValid(event) {
    this._input = event.target;
    const isValid = this._input.validity.valid;

    if (!isValid) {
      this._input.classList.add();
      this._disableSubmit();
      this._addErrorMessage();
    } else {
      this._input.classList.remove();
      this._enableSubmit();
      this._removeErrorMessage();
    }
  }

  // ---------- Faz com que o Botão se torne ativo ----------
  _enableSubmit() {
    const form = this._input.closest(this._data.formSelector);
    const submitBtn = form.querySelector(this._data.submitButtonSelector);
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.remove(this._data.inactiveButtonClass);
  }

  // ---------- Faz com que o Botão se torne inativo ----------
  _disableSubmit() {
    const form = this._input.closest(this._data.formSelector);
    const submitBtn = form.querySelector(this._data.submitButtonSelector);
    submitBtn.setAttribute("disabled", true);
    submitBtn.classList.add(this._data.inactiveButtonClass);
  }

  _getForm() {
    const form = document.querySelector(this._formSelector);
    return form;
  }

  _setEventListeners() {
    for (const input of this._inputs) {
      input.addEventListener("input", (evt) => {
        this._checkIsValid(evt);
      });
    }
  }

  enableValidation() {
    this._form = this._getForm();
    this._inputs = Array.from(
      this._form.querySelectorAll(this._data.inputSelector)
    );
    this._setEventListeners();
  }
}
