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
const buttonOpenModalNewCard = document.querySelector(".profile__add-button");

const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
const newCardLink = newCardForm.querySelector(".popup__input_type_url");

const avatarImage = document.querySelector(".profile__image");
const popupImageEditing = document.querySelector(".popup_type_edit-avatar");
const buttonOpenImageEditing = document.querySelector(".avatar__container");
const editingIcon = document.querySelector(".profile__image-editing");
const editAvatarForm = document.querySelector(
  '.popup__form[name="edit-avatar"]'
);
const avatarLink = document.querySelector(".popup__input_type_avatar");

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
function loadingSaveButton(isLoading, popup) {
  const saveButton = popup.querySelector(".popup__button");
  if (isLoading) {
    saveButton.textContent = "Сохранение...";
  } else {
    saveButton.textContent = "Сохранить";
  }
}

//Редактирование данных профиля
function editFormSubmit(event) {
  event.preventDefault();

  loadingSaveButton(true, popupEditProfile);

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
      loadingSaveButton(false, popupEditProfile);
    });
}

//Добавление новой карточки
function newCardSubmit(event) {
  event.preventDefault();

  loadingSaveButton(true, popupNewCard);

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
      loadingSaveButton(false, popupNewCard);
    });
}

//Изменение аватара
function editAvatarSubmit(event) {
  event.preventDefault();

  loadingSaveButton(true, popupImageEditing);

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
      loadingSaveButton(false, popupImageEditing);
    });
}

//Слушатели для изменения аватара
buttonOpenImageEditing.addEventListener("mouseover", function () {
  editingIcon.setAttribute("style", "display: block");
  avatarImage.classList.add("profile__image-dark");
});

buttonOpenImageEditing.addEventListener("mouseout", function () {
  editingIcon.setAttribute("style", "display: none");
  avatarImage.classList.remove("profile__image-dark");
});

buttonOpenImageEditing.addEventListener("click", function () {
  openPopup(popupImageEditing);
  clearValidation(popupImageEditing, validationConfig);
});

editAvatarForm.addEventListener("submit", editAvatarSubmit);

//Слушатели для попапов
buttonOpenModalEditProfile.addEventListener("click", function () {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;

  openPopup(popupEditProfile);
  clearValidation(editForm, validationConfig);
});

editForm.addEventListener("submit", editFormSubmit);

newCardForm.addEventListener("submit", newCardSubmit);

buttonOpenModalNewCard.addEventListener("click", function () {
  newCardName.value = "";
  newCardLink.value = "";
  openPopup(popupNewCard);
  clearValidation(newCardForm, validationConfig);
});

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
