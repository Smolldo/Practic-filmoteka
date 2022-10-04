
import { user } from './auth';

export async function readFromFBHundler(nameCollection) {
  const response = await fetch(
    `https://practic-bc31f-default-rtdb.firebaseio.com/${user.idLocal}/${nameCollection}.json?auth=${user.id}`);
  const response_1 = await response.json();
  if (response_1 && response_1.error) {
    console.log('error when read from DB');
  }
  return response_1 ? Object.keys(response_1).map(key => ({
    ...response_1[key],
    id: key,
  }))
    : [];
}

///////////////////////////////////////////////////////////////////////////////

export async function writeToFBHundler(nameCollection, object) {
  const response = await fetch(
    `https://practic-bc31f-default-rtdb.firebaseio.com/${user.idLocal}/${nameCollection}.json?auth=${user.id}`,
    {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const data = await response.json();
  return console.log(data);
}

