import { useState, useEffect } from 'react';
import { Vacancies, Metro } from '../../types';
import { Link } from 'react-router-dom';
import VacancyList from '../vacancy-list/vacancy-list';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancies>();
  const [searchValue, setSeacrhValue] = useState('');
  const [metro, setMetro] = useState<Metro>();
  const [metroStation, setMetroStation] = useState();
  const [prevSearch, setPrevSearch] = useState();

  function fetchMetro() {
    fetch('https://api.hh.ru/metro/1')
      .then((res) => res.json())
      .then((result) => {
        setMetro(result);
      });
  }

  function loadVacancies() {
    setIsLoading(true);
    fetch(
      `https://api.hh.ru/${
        searchValue ? `vacancies?text=${searchValue}` : 'vacancies?'
      }${metroStation !== undefined ? `&metro=${metroStation}&2.1` : ''}&area=1`
    )
      .then((res) => res.json())
      .then((result) => {
        setVacancies(result);
        setIsLoading(false);
        setPrevSearch(result);
        //   localStorage.setItem('prevSearch', `${JSON.stringify(result)}`);
      });
  }

  function onChangeMetroStation(e: any) {
    setMetroStation(e.target.value);
  }

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setSeacrhValue(e.target.value);
  }

  useEffect(() => {
    fetchMetro();
  }, []);

  return (
    <div>
      <Link to='/vacancy/48502899'>About</Link>
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
      <VacancyList isLoading={isLoading} vacancies={vacancies}></VacancyList>
    </div>
  );
}
