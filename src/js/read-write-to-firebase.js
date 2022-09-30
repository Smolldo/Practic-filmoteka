import { user } from './auth';

export function readFromFBHundler(nameCollection) {
  return fetch(
    `https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection/${user.idLocal}/${nameCollection}.json?auth=${user.id}`,
  )
    .then(response => response.json())
    .then(response => {
      if (response && response.error) {
        console.log('ошибка чтения из FB');
        //`<p class="error">${response.error}</p>`;
      }
      return response
        ? Object.keys(response).map(key => ({
            ...response[key],
            id: key,
          }))
        : [];
    });
}

///////////////////////////////////////////////////////////////////////////////

export function writeToFBHundler(nameCollection, object) {
  return fetch(
    `https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection/${user.idLocal}/${nameCollection}.json?auth=${user.id}`,
    {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(data => console.log(data));
}
