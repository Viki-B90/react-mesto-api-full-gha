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

    setToken(token) {
      this._headers.authorization = `Bearer ${token}`;
    }
  
    // Получаем данные пользователя
    getUserProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    // Получаем информации о пользователе
    setUserProfile(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    // Добавление новой карточки
    addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        credentials: 'include',
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
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    // Поставить лайк на карточку
    setLikeCard(_id) {
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    // Снять лайк с карточки
    deleteLikeCard(_id) {
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://api.domainname.stud.viki.nomoredomains.monster',
    headers: {
      'Content-Type': 'application/json'
    }
  });