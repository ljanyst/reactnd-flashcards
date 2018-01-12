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
