import "../pages/index.css";
import { initialCards } from "../components/initialCards.js";
import { openPopup, closePopup, overlayClose } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/cards.js";

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

//Добавление карточек на страницу
initialCards.forEach(function (item) {
  const newCard = createCard(item, deleteCard, likeCard, openImage, openPopup);
  placesList.append(newCard);
});

buttonsClosePopup.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

popups.forEach((item) => {
  if (item.classList.contains("popup_is-opened")) {
    item.addEventListener("click", overlayClose(item));
  }
});

function openImage(item) {
  popupOpenPictureImage.src = item.link;
  popupOpenPictureImage.alt = item.name;
  popupOpenPictureCaption.textContent = item.name;

  openPopup(popupOpenPicture);
}

function editFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(popupEditProfile);
}

function newCardSubmit(event) {
  event.preventDefault();

  const newPlaceValues = {
    name: newCardName.value,
    alt: newCardName.value,
    link: newCardLink.value,
  };

  const newPlace = createCard(
    newPlaceValues,
    deleteCard,
    likeCard,
    openImage,
    openPopup
  );
  placesList.prepend(newPlace);

  newCardForm.reset();
  closePopup(popupNewCard);
}

buttonOpenModalEditProfile.addEventListener("click", function () {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

editForm.addEventListener("submit", editFormSubmit);

newCardForm.addEventListener("submit", newCardSubmit);

buttonOpenModalNewCard.addEventListener("click", () => openPopup(popupNewCard));
