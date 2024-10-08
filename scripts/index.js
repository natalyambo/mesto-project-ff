// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCards(item, deleteCards) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');

  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  
  deleteButton.addEventListener('click', () => deleteCards(card));

  return card;
};

function deleteCards(card) {  
  card.remove();
}; 

initialCards.forEach(function(item) {
  const newCard = createCards(item, deleteCards);
  placesList.append(newCard);
});
