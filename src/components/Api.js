export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
      .then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
      .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }

  delCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  addLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse);
  }

  delLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  updateAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }
}
