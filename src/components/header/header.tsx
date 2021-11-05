import React, { useState, useEffect } from 'react';
import { Vacancies, Metro } from '../../types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocation, useHistory } from 'react-router-dom';

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

export function Header({
  setVacancies,
}: {
  setVacancies: (vacancies: Vacancies) => void;
}) {
  const { textParam, metroParam } = useQuery();
  const history = useHistory();

  const [searchValue, setSeacrhValue] = useState(textParam);
  const [metro, setMetro] = useState<Metro>();
  const [metroStation, setMetroStation] = useState(metroParam);

  function fetchMetro() {
    fetch('https://api.hh.ru/metro/1')
      .then((res) => res.json())
      .then((result) => {
        setMetro(result);
      });
  }

  function loadVacancies() {
    if (!searchValue && !metroStation) return;
    fetch(
      `https://api.hh.ru/${
        searchValue ? `vacancies?text=${searchValue}` : 'vacancies?'
      }${metroStation ? `&metro=${metroStation}` : ''}&area=1`
    )
      .then((res) => res.json())
      .then((result) => {
        setVacancies(result);
        history.push(`/?text=${searchValue}&metro=${metroStation}`);
      });
  }

  function onChangeMetroStation(e: SelectChangeEvent) {
    setMetroStation(e.target.value);
  }

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setSeacrhValue(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') loadVacancies();
  }

  useEffect(() => {
    fetchMetro();
  }, []);

  useEffect(() => {
    loadVacancies();
  }, []);

  return (
    <div>
      <Box component='form' className='main-form' noValidate>
        <div className='main-form__top-text-header'>Найди уже работу</div>
        <div className='main-form__top'>
          <FormControl fullWidth className='main-form__top__select'>
            <InputLabel id='demo-simple-select-label'>Станция</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={metroStation || ''}
              onChange={onChangeMetroStation}
              MenuProps={{ PaperProps: { sx: { maxHeight: 100 } } }}
            >
              {metro?.lines.map((item) =>
                item.stations.map((item) => (
                  <MenuItem value={item.id}>{item.name || ''}</MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>Пожалуйста, выберите станцию метро</FormHelperText>
          </FormControl>
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
        </div>
        <div className='main-form__bottom'>
          <div className='main-form__bottom__buttons'>
            <Button variant='contained' onClick={loadVacancies}>
              Поиск
            </Button>
            <Button variant='outlined'>Карта</Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
