const config = {
  baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "30d7dfb4-52db-4323-8529-5ffc3a10a46d",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const getInitiatCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export function changeUserData(nameValue, aboutValue) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: aboutValue,
    }),
  }).then(handleResponse);
}

export function addNewCard(nameValue, linkValue) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      link: linkValue,
    }),
  }).then(handleResponse);
}

export function changeAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(handleResponse);
}

export function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}
