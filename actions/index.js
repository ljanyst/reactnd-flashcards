//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 12.01.2018
//------------------------------------------------------------------------------

export const DECK_SET_DB = 'DECK_SET_DB';
export const DECK_CREATE = 'DECK_CREATE';

export function deckSetDb(db) {
  return {
    type: DECK_SET_DB,
    db
  };
}

export function deckCreate(name) {
  return {
    type: DECK_CREATE,
    name
  };
}
