import { addLikeApi, removeLikeApi, deleteCardApi } from "./api";

export { createCard, deleteCard, likeCard };

function createCard(item, deleteCard, likeCard, openImage, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");

  const cardId = item._id;

  cardLikeCounter.textContent = item.likes.length;

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  const hasUserLike = item.likes.some((like) => {
    return like._id === userId;
  });

  if (hasUserLike) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }

  if (item.owner._id !== userId) {
    deleteButton.setAttribute("style", "display: none");
  }

  deleteButton.addEventListener("click", () => deleteCard(card, cardId));
  cardLikeButton.addEventListener("click", (event) =>
    likeCard(event, cardId, cardLikeCounter)
  );
  cardImage.addEventListener("click", () => openImage(item));

  return card;
}

function deleteCard(card, cardId) {
  deleteCardApi(cardId)
    .then(card.remove())
    .catch((err) => {
      console.log(err, "Ошибка при удалении карточки");
    });
}

function likeCard(event, cardId, cardLikeCounter) {
  const cardLikeButton = event.target;

  const isLiked = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  );
  const likeMethod = isLiked ? removeLikeApi : addLikeApi;

  likeMethod(cardId)
    .then((data) => {
      cardLikeCounter.textContent = data.likes.length;
      cardLikeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(
        err,
        'Ошибка при ${isLiked ? "удалении лайка" : "лайке карточки"}'
      );
    });
}
