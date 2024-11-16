export { createCard, deleteCard, likeCard };

function createCard(item, deleteCard, likeCard, openImage, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");

  const cardId = item._id;

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", () => deleteCard(card));
  cardLikeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", () => openImage(item));

  return card;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}
