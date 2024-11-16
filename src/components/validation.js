export { enableValidation, clearValidation };

//Функция показать ошибку
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const inputErrorElement = formElement.querySelector(
    `.${inputElement.id}-error`
  );

  inputElement.classList.add(validationConfig.inputErrorClass);
  inputErrorElement.classList.add(validationConfig.errorClass);
  inputErrorElement.textContent = errorMessage;
};

//Функция скрыть ошибку
const hideInputError = (formElement, inputElement, validationConfig) => {
  const inputErrorElement = formElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.remove(validationConfig.inputErrorClass);
  inputErrorElement.classList.remove(validationConfig.errorClass);
  inputErrorElement.textContent = "";
};

//Проверка валидности каждого поля по отдельности
const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//Проверка наличия невалидного поля в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Стилизация кнопки в зависимости от валидности формы
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

//Добавление обработчика к каждому полю формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);

      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

//валидация всех форм на странице
function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

//Функция очистки ошибок
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
}
