import { createStore, AnyAction } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState = {
  per_page: 0,
  page: 0,
  pages: 0,
  found: 0,
  items: [],
};

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_VACANCIES':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer, composeWithDevTools());
