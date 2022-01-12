import React from 'react';
import { Vacancies, Vacancy } from '../../types';
import { VacancyListItem } from '../vacancy-list-item/vacancy-list-item';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { loadVacanciesAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => {
    const query = new URLSearchParams(search);
    return {
      currentPage: query.get('page') || '',
    };
  }, [search]);
}

export function VacancyList() {
  const { currentPage } = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const vacancies = useSelector((state: Vacancies) => state);
  const { items, found, pages } = vacancies;

  function handleChangePage(_: any, value: number) {
    window.scrollTo(0, 0);
    dispatch({ type: 'SET_PAGE_VALUE', payload: (value === 0 ? value : value - 1) });
    dispatch(loadVacanciesAction(history.push, value - 1));
    console.log('page changed to', value);
  }

  if (!vacancies) {
    return null;
  }
  if (vacancies.found === 0 && vacancies.items.length !== 0) {
    return <div>Ничего не найдено, сиди на жопе</div>;
  }
  return (
    <div>
      {vacancies.items.length !== 0 ? (
        <div className='dohuya'>Найдено {found} вакансий, иди работать</div>
      ) : null}
      <div className='list'>
        {items.map((item: Vacancy) => (
          <VacancyListItem {...item} key={item.id}></VacancyListItem>
        ))}
      </div>
      {vacancies.found !== 0 ? (
        <div className='pagination'>
          <Stack spacing={2} sx={{mt: 16}}>
            <Pagination
              count={pages}
              page={Number(currentPage) + 1}
              onChange={handleChangePage}
            />
          </Stack>
        </div>
      ) : null}
    </div>
  );
}
