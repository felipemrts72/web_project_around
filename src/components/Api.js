import { avatar } from "./utils";

export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getData(path) {
    return fetch(`${this._url}${path}`, {
      //Utilizando o PATH eu posso utilizar o mesmo método para pegar os cartões e as informações do usuário.
      headers: this._headers, //Autorização feita na instância da classe Api(em ./pages/index.js)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`); //Retorna o erro para ser tradado em "catch" no index.js
    });
  }

  profileEdit({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      //Para não colocar muitos parametros (e ter os 2 exemplos), coloquei o profileEdit com o endereço direto.
      method: "PATCH", //PATCH significa que a solicitação irá ATUALIZAR os dados já colocados no Servidor (Substituílos, basicamente.)
      headers: this._headers,
      body: JSON.stringify({
        //Transforma os items JS em string para o servidor.
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  avatarEdit(url) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(res);

        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  sendCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeOn(id) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  likeOff(id) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
