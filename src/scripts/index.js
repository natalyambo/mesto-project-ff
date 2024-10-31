import '../pages/index.css';
import {initialCards} from '../components/initialCards.js';
import {openPopup, closePopup} from '../components/modal.js';
import {createCard, deleteCard, likeCard} from '../components/cards.js';


const placesList = document.querySelector('.places__list');

//Добавление карточек на страницу
initialCards.forEach(function(item) {
  const newCard = createCard(item, deleteCard, likeCard, openImage, openPopup);
  placesList.append(newCard);
});



//Функция открытия изображения
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption'); 
const popupCloser = document.querySelectorAll('.popup__close');  //Одна кнопка у всех попапов

function openImage(item) {
popupImage.src = item.link;
popupImage.alt = item.name;
popupCaption.textContent = item.name;

openPopup(popupTypeImage);
};

popupCloser.forEach(item => {
  item.addEventListener('click', () => closePopup(item.closest('.popup')));
});


//Редактирование профиля
const popupEdit = document.querySelector('.popup_type_edit');
const editOpener = document.querySelector('.profile__edit-button');

const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const inputName = editForm.querySelector('.popup__input_type_name');
const inputDescription = editForm.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

editOpener.addEventListener('click', function() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
});

function editFormSubmit(event) {
    event.preventDefault(); 

    profileTitle.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    closePopup(popupEdit);
};

editForm.addEventListener('submit', editFormSubmit); 



//Добавление новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardOpener = document.querySelector('.profile__add-button');

const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const newCardName = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLink = newCardForm.querySelector('.popup__input_type_url');

newCardOpener.addEventListener('click', () => openPopup(popupNewCard));

function newCardSubmit(event) {
  event.preventDefault();

  const newPlaceValues = {
    name: newCardName.value,
    alt: newCardName.value,
    link: newCardLink.value
  };

  const newPlace = createCard(newPlaceValues, deleteCard, likeCard, openImage, openPopup);
  placesList.prepend(newPlace);

  newCardForm.reset();
  closePopup(popupNewCard);
};

popupNewCard.addEventListener('submit', newCardSubmit); 





