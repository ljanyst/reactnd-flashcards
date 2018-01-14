//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 12.01.2018
//------------------------------------------------------------------------------

import {
  DECK_SET_DB, DECK_CREATE, DECK_REMOVE, CARD_CREATE
} from '../actions';

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

  case DECK_REMOVE:
    var deckRemoveState = Object.assign({}, state);
    delete deckRemoveState[action.name];
    return deckRemoveState;

  case CARD_CREATE:
    var cardCreateState = Object.assign({}, state);
    cardCreateState[action.deckId].questions.push(action.card);
    return cardCreateState;

  default:
    return state;
  }
}
