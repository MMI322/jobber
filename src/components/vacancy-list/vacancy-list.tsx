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
    dispatch({
      type: 'SET_PAGE_VALUE',
      payload: value === 0 ? value : value - 1,
    });
    dispatch(loadVacanciesAction(history.push, value - 1));
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
        <div className='vacancyCount'>Найдено {found} вакансий</div>
      ) : null}
      <div className='list'>
        {items.map((item: Vacancy) => (
          <VacancyListItem {...item} key={item.id}></VacancyListItem>
        ))}
      </div>
      {vacancies.found !== 0 ? (
        <Stack spacing={2} sx={{ my: '16px', mx: 'auto', maxWidth: 400 }}>
          <Pagination
            count={pages}
            page={Number(currentPage) + 1}
            onChange={handleChangePage}
          />
        </Stack>
      ) : null}
    </div>
  );
}
