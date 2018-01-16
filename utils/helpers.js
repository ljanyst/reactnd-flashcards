//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 14.01.2018
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Make id
//------------------------------------------------------------------------------
export function makeId(length) {
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for(var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//------------------------------------------------------------------------------
// Fisher-Yates Shuffle
//------------------------------------------------------------------------------
export function shuffle(array) {
  for(let i = array.length-1; i >= 0; --i) {
    let j = Math.floor(Math.random()*(i+1));
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}
