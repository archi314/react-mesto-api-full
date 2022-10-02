export const baseUrl = 'http://api.artemstukalov.nomoredomains.icu'; // было 4000

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
};

export const register = (email, password) => {
  return fetch (`${baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => getResponse(res));
};

export const login = (email, password) => {
  return fetch (`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => getResponse(res));
};

export const signout = () => {
  return fetch (`${baseUrl}/signout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
  })
    .then((res) => getResponse(res));
};