import { Vacancy } from './vacancy';

type Pagination = {
  per_page: number;
  page: number;
  pages: number;
  found: number;
};

export type Vacancies = Pagination & {
  items: Vacancy[];
  page_value: number;
};

export type State = Vacancies & {
  query: {
    searchValue: string;
    searchMetro: string;
  };
  searchMapValue: number[][];
};
