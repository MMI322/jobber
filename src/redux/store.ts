import { createStore, AnyAction, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { State } from '../types';

const defaultState: State = {
  per_page: 0,
  page: 0,
  page_value: 0,
  pages: 0,
  found: 0,
  items: [],
  query: {
    searchValue: '',
    searchMetro: '',
  },
  searchMapValue: [
    [55.7, 37.6],
    [55.8, 37.7],
  ],
};

const vacanciesReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_VACANCIES':
      return { ...state, ...action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_PAGE_VALUE':
      return { ...state, page_value: action.payload };
    case 'SET_MAP_SEARCH_VALUE':
      return { ...state, searchMapValue: action.payload };
    default:
      return state;
  }
};

export const store = createStore(
  vacanciesReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
