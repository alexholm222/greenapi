class Api {
    constructor(options) {
      this._options = options;
    }

    getStateInstance(idInstance, apiTokenInstance) {
      return fetch(`${this._options.baseUrl}${idInstance}/getStateInstance/${apiTokenInstance}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(this._checkResponse)
    }

    getSettings(idInstance, apiTokenInstance) {
      return fetch(`${this._options.baseUrl}${idInstance}/getStateInstance/${apiTokenInstance}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(this._checkResponse)
    }

    sendMessage(idInstance, apiTokenInstance, number, message) {
      return fetch(`${this._options.baseUrl}${idInstance}/SendMessage/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId: `${number}@c.us`,
          message
        })
      })
      .then(this._checkResponse)
    }

    getMessage(idInstance, apiTokenInstance) {
      return fetch(`${this._options.baseUrl}${idInstance}/ReceiveNotification/${apiTokenInstance}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
    }

    deleteMessage(idInstance, apiTokenInstance, receiptId) {
      return fetch(`${this._options.baseUrl}${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
    }

    getAvatar(idInstance, apiTokenInstance, number) {
      return fetch(`${this._options.baseUrl}${idInstance}/GetAvatar/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId: `${number}@c.us`
        })
      })
      .then(this._checkResponse)
    }

    checkWhatsapp(idInstance, apiTokenInstance, number) {
      return fetch(`${this._options.baseUrl}${idInstance}/CheckWhatsapp/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: number
        })
      })
      .then(this._checkResponse)
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json()
      } else {
       return Promise.reject(res)
      }
    }
  }
  
  export const greenApi = new Api ({
    baseUrl: 'https://api.green-api.com/waInstance',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  