class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject (`Ошибка: ${res.status}`);
    }
  
    // Получаем данные пользователя
    getUserProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    // Получаем информации о пользователе
    setUserProfile(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._checkResponse);
    }
  
    // Обновление аватара
    changeUserAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      })
      .then(this._checkResponse);
    }
  
    // Загрузка карточек
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    // Добавление новой карточки
    addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponse);
    }
  
    // Удаление карточки
    deleteCard(_id) {
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    // Поставить лайк на карточку
    setLikeCard(_id) {
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    // Снять лайк с карточки
    deleteLikeCard(_id) {
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
      authorization: '099d63fb-a4bb-49f9-8842-ff7eb833d30d',
      'Content-Type': 'application/json'
    }
  });