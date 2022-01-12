import { Dispatch } from 'redux';
import { State } from '../types';

export const loadVacanciesAction =
  (push: (route: string) => void, activePage: number = 0) =>
  (dispatch: Dispatch, getState: () => State) => {
    const { searchMetro, searchValue } = getState().query;
    const query = [searchValue && `text=${searchValue}`, searchMetro && `metro=${searchMetro}`, `page=${activePage}` ].filter(item => item).join('&')
    return fetch(
      `https://api.hh.ru/vacancies?${query}&area=1`
    )
      .then((res) => res.json())
      .then((result) => {
          console.log(query)
        push('/?' + query)
        dispatch({ type: 'SET_VACANCIES', payload: result });
      });
  };
