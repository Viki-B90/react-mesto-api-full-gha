const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject (`Ошибка: ${res.status}`);
}

const BASE_URL = 'https://api.domainname.stud.viki.nomoredomains.monster';
//const BASE_URL = 'http://localhost:3001';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse);
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse);
}

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`,
    },
  })
  .then(checkResponse);
}