import "../pages/index.css";
import { openPopup, closePopup, overlayClose } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/cards.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getInitiatCards,
  getUserData,
  changeUserData,
  addNewCard,
  changeAvatar,
} from "../components/api.js";

const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const popupOpenPicture = document.querySelector(".popup_type_image");
const popupOpenPictureImage = popupOpenPicture.querySelector(".popup__image");
const popupOpenPictureCaption = document.querySelector(".popup__caption");
const buttonsClosePopup = document.querySelectorAll(".popup__close"); //Одна кнопка у всех попапов

const popupEditProfile = document.querySelector(".popup_type_edit");
const saveEditButton = popupEditProfile.querySelector(".popup__button");
const buttonOpenModalEditProfile = document.querySelector(
  ".profile__edit-button"
);
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const inputName = editForm.querySelector(".popup__input_type_name");
const inputDescription = editForm.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupNewCard = document.querySelector(".popup_type_new-card");
const saveNewCardButton = popupNewCard.querySelector(".popup__button");
const buttonOpenModalNewCard = document.querySelector(".profile__add-button");

const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
const newCardLink = newCardForm.querySelector(".popup__input_type_url");

const avatarImage = document.querySelector(".profile__image");
const popupImageEditing = document.querySelector(".popup_type_edit-avatar");
const saveAvatarButton = popupImageEditing.querySelector(".popup__button");
const buttonOpenImageEditing = document.querySelector(".avatar__container");
const editAvatarForm = document.querySelector(
  '.popup__form[name="edit-avatar"]'
);
const avatarLink = editAvatarForm.querySelector(".popup__input_type_avatar");

let userId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

//Закрытие попапов
buttonsClosePopup.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

popups.forEach((item) => {
  item.addEventListener("click", function (event) {
    overlayClose(event);
  });
});

function openImage(item) {
  popupOpenPictureImage.src = item.link;
  popupOpenPictureImage.alt = item.name;
  popupOpenPictureCaption.textContent = item.name;

  openPopup(popupOpenPicture);
}

//Изменение кнопки сохранения при загрузке
function loadSaveButton(isLoading, button, loadingText, finalText) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = finalText;
  }
}

//Редактирование данных профиля
function editFormSubmit(event) {
  event.preventDefault();

  loadSaveButton(true, saveEditButton, "Сохранение...", "Сохранить");

  changeUserData(inputName.value, inputDescription.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      closePopup(popupEditProfile);
    })

    .catch((err) => {
      console.log(err, "Ошибка при редактировании профиля");
    })
    .finally(() => {
      loadSaveButton(false, saveEditButton, "Сохранение...", "Сохранить");
    });
}

//Добавление новой карточки
function addNewCardSubmit(event) {
  event.preventDefault();

  loadSaveButton(true, saveNewCardButton, "Сохранение...", "Сохранить");

  addNewCard(newCardName.value, newCardLink.value)
    .then((data) => {
      const newPlace = createCard(
        data,
        deleteCard,
        likeCard,
        openImage,
        userId
      );

      placesList.prepend(newPlace);

      closePopup(popupNewCard);
      newCardForm.reset();
    })
    .catch((err) => {
      console.log(err, "Ошибка при добавлении новой карточки");
    })
    .finally(() => {
      loadSaveButton(false, saveNewCardButton, "Сохранение...", "Сохранить");
    });
}

//Изменение аватара
function editAvatarSubmit(event) {
  event.preventDefault();

  loadSaveButton(true, saveAvatarButton, "Сохранение...", "Сохранить");

  changeAvatar(avatarLink.value)
    .then((data) => {
      avatarImage.style.backgroundImage = `url(${data.avatar})`;

      closePopup(popupImageEditing);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err, "Ошибка при редактировании аватара");
    })
    .finally(() => {
      loadSaveButton(false, saveAvatarButton, "Сохранение...", "Сохранить");
    });
}

//Слушатели открытие попапов
buttonOpenImageEditing.addEventListener("click", function () {
  openPopup(popupImageEditing);
  clearValidation(editAvatarForm, validationConfig);
});

buttonOpenModalEditProfile.addEventListener("click", function () {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;

  openPopup(popupEditProfile);
  clearValidation(editForm, validationConfig);
});

buttonOpenModalNewCard.addEventListener("click", function () {
  newCardName.value = "";
  newCardLink.value = "";

  openPopup(popupNewCard);
  clearValidation(newCardForm, validationConfig);
});

//Слушатели отправки формы
editAvatarForm.addEventListener("submit", editAvatarSubmit);

editForm.addEventListener("submit", editFormSubmit);

newCardForm.addEventListener("submit", addNewCardSubmit);

//Загрузка начальной страницы
function initialPage() {
  return Promise.all([getUserData(), getInitiatCards()])
    .then(([userData, cardsData]) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      userId = userData._id;

      avatarImage.setAttribute(
        "style",
        `background-image: url('${userData.avatar}')`
      );

      cardsData.forEach(function (item) {
        const newCard = createCard(
          item,
          deleteCard,
          likeCard,
          openImage,
          userId
        );
        placesList.append(newCard);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

initialPage();
