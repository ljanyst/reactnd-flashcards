//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 12.01.2018
//------------------------------------------------------------------------------

import { DECK_SET_DB, DECK_CREATE } from '../actions';

export default function reducer(state={}, action) {
  switch(action.type) {

  case DECK_SET_DB:
    return action.db;

  case DECK_CREATE:
    return {
      ...state,
      [action.name]: {
        title: action.name,
        questions: []
      }
    };

  default:
    return state;
  }
}
