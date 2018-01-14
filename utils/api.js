//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 12.01.2018
//------------------------------------------------------------------------------

import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'FlashCards:CardStore';

//------------------------------------------------------------------------------
// Fetch all the data from the store
//------------------------------------------------------------------------------
export function fetchData() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if(data === null)
        return {};
      return data;
    });
}

//------------------------------------------------------------------------------
// Create deck
//------------------------------------------------------------------------------
export function deckCreate(deckName) {
  return fetchData()
    .then(data => ({
      ...data,
      [deckName]: {
        title: deckName,
        questions: []
      }
    }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(STORAGE_KEY, data));
}

//------------------------------------------------------------------------------
// Remove deck
//------------------------------------------------------------------------------
export function deckRemove(deckName) {
  return fetchData()
    .then(data => {
      delete data[deckName];
      return data;
    })
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(STORAGE_KEY, data));
}
