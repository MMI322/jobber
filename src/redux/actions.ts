import { join } from 'path/posix';
import { Dispatch } from 'redux';
import { State } from '../types';

export const loadVacanciesAction =
  (push: (route: string) => void, activePage: number = 0) =>
  (dispatch: Dispatch, getState: () => State) => {
    const { searchMetro, searchValue } = getState().query;
    const query = [
      searchValue && `text=${searchValue}`,
      searchMetro && `metro=${searchMetro}`,
      `page=${activePage}`,
    ]
      .filter((item) => item)
      .join('&');
    return fetch(`https://api.hh.ru/vacancies?${query}&area=1`)
      .then((res) => res.json())
      .then((result) => {
        push('/?' + query);
        dispatch({ type: 'SET_VACANCIES', payload: result });
      });
  };

export const loadMapVacanciesAction =
  () => (dispatch: Dispatch, getState: () => State) => {
    const { searchMetro, searchValue } = getState().query;
    const searchMapValue = getState().searchMapValue;
    const query = [
      searchValue && `text=${searchValue}`,
      searchMapValue &&
        `top_lat=${searchMapValue[1][0]}&bottom_lat=${searchMapValue[0][0]}&left_lng=${searchMapValue[0][1]}&right_lng=${searchMapValue[1][1]}`,
      `per_page=100`,
    ]
      .filter((item) => item)
      .join('&');
    return fetch(`https://api.hh.ru/vacancies?${query}`).then((res) =>
      res.json().then((result) => {
        dispatch({ type: 'SET_VACANCIES', payload: result });
      })
    );
  };
