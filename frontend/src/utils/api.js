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
    deleteCard(card) {
      return fetch(`${this._baseUrl}/cards/${card}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

    changeLikeCardStatus(card, isLiked) {
      const method = isLiked ? 'PUT' : 'DELETE';
      return fetch(`${this._baseUrl}/cards/${card._id}/likes`,
      {
        method: method,
        credentials: 'include',
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
   }
  
  export const api = new Api({
    baseUrl: 'https://api.domainname.stud.viki.nomoredomains.monster',
    //baseUrl: 'http://localhost:3001',
    headers: {
      //'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  });