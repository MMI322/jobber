import React, { useState, useEffect } from 'react';
import { Metro, Vacancies } from '../../types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadVacanciesAction } from '../../redux/actions';
import Autocomplete from '@mui/material/Autocomplete';
import { Station } from '../../types/metro';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => {
    const query = new URLSearchParams(search);
    return {
      textParam: query.get('text') || '',
      metroParam: query.get('metro') || '',
    };
  }, [search]);
}

export function Header() {
  const { textParam, metroParam } = useQuery();
  const history = useHistory();

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState(textParam);
  const [metro, setMetro] = useState<Station[]>();
  const [searchMetro, setSearchMetro] = useState<Station | null>(null);

  const vacancies = useSelector((state: Vacancies) => state);

  function fetchMetro() {
    fetch('https://api.hh.ru/metro/1')
      .then((res) => res.json())
      .then((result: Metro) => {
        let stations: Station[] = result?.lines.reduce(
          (acc, item) => [...acc, ...item.stations],
          []
        );

        setMetro(stations);
        if (metroParam) {
          let findedMetroStation = stations.find(
            (item) => item.id === metroParam
          );
          setSearchMetro(findedMetroStation);
        }
      });
  }

  function loadVacancies() {
    dispatch({
      type: 'SET_QUERY',
      payload: { searchValue, searchMetro: searchMetro?.id },
    });
    dispatch(loadVacanciesAction(history.push));
  }

  function onChangeMetroStation(e: any, value: Station | null) {
    setSearchMetro(value);
  }

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') loadVacancies();
  }

  useEffect(() => {
    fetchMetro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchValue !== '') loadVacancies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='header'>
      <Box component='form' className='main-form' noValidate>
        <div className='main-form__top-text-header'>Найди уже работу</div>
        <div className='main-form__top'>
          <Autocomplete<Station>
            value={searchMetro}
            onChange={onChangeMetroStation}
            getOptionLabel={(option) => option.name || ''}
            options={metro || []}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              );
            }}
            filterSelectedOptions
            sx={{ width: 300, mr: 2 }}
            renderInput={(params) => (
              <TextField {...params} label='Выберите станцию метро' />
            )}
          />

          <TextField
            className='main-form__top__text-field'
            id='outlined-basic'
            label='Вакансия'
            variant='outlined'
            value={searchValue}
            onChange={onChangeName}
            onKeyPress={handleKeyPress}
            helperText='Пожалуйста, введите название вакансии'
          />
          <Button
            className='search-button'
            variant='contained'
            onClick={loadVacancies}
            sx={{ ml: 2 }}
          >
            Поиск
          </Button>
        </div>
        {vacancies.items.length !== 0 ? (
          <div className='main-form__bottom'>
            <div className='main-form__bottom__buttons'>
              <Link to='/'>
                <Button
                  variant={
                    window.location.href.indexOf('map') > -1
                      ? 'outlined'
                      : 'contained'
                  }
                  sx={{ width: 170, height: 40 }}
                >
                  Список
                </Button>
              </Link>

              <Link to='/map'>
                <Button
                  variant={
                    window.location.href.indexOf('map') > -1
                      ? 'contained'
                      : 'outlined'
                  }
                  sx={{ width: 170, height: 40 }}
                >
                  Карта
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </Box>
    </div>
  );
}
