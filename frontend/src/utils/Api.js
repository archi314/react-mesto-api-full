export class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  setToken(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    }
  }

  /** Загрузка информации о пользователе с сервера. */

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /** Получение карточек с сервера. */
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /** Редактирование профиля. */

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then(this._checkResponse);
  }

  /** Добавление новой карточки. */

  addUserCard(item) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then(this._checkResponse);
  }

  /** Удаления карточки. */

  removeCard(data) {
    return fetch(`${this._url}/cards/${data}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /** Постановка и снятие лайка. */

  setLike(data) {
    return fetch(`${this._url}/cards/${data}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike(data) {
    return fetch(`${this._url}/cards/${data}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /** Обновление аватара пользователя. */

  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then(this._checkResponse);
  }
}

const api = new Api(
  "http://localhost:4000"
);

export default api;