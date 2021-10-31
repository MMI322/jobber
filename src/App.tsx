import React, { useState, useEffect } from 'react';
import { Vacancies, Metro } from './types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './style.css';

function App() {
  const [error, setError] = useState<null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Vacancies>();
  const [searchValue, setSeacrhValue] = useState('');
  const [metro, setMetro] = useState<Metro>();
  const [metroStation, setMetroStation] = useState();

  function setVacancies() {
    fetch(
      `https://api.hh.ru/${
        searchValue ? `vacancies?text=${searchValue}` : 'vacancies?'
      }${metroStation !== undefined ? `&metro=${metroStation}&2.1` : ''}&area=1`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function fetchMetro() {
    fetch('https://api.hh.ru/metro/1')
      .then((res) => res.json())
      .then(
        (result) => {
          setMetro(result);
        },
        (error) => {
          setError(error);
        }
      );
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

  // console.log(window.location)

  if (!isLoaded) {
    return (
      <div>
        <Box component='form' className='main-form' noValidate>
          <div className='main-form__top-text-header'>
            Найди работу своей пизде
          </div>
          <div className='main-form__top'>
            <FormControl fullWidth className='main-form__top__select'>
              <InputLabel id='demo-simple-select-label'>Станция</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={metroStation || ''}
                onChange={onChangeMetroStation}
              >
                {metro?.lines.map((item) =>
                  item.stations.map((item) => (
                    <MenuItem value={item.id}>{item.name || ''}</MenuItem>
                  ))
                )}
              </Select>
              <FormHelperText>
                Пожалуйста, выберите станцию метро
              </FormHelperText>
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
              <Button
                variant='contained'
                onClick={() => {
                  setVacancies();
                }}
              >
                Поиск
              </Button>
              <Button variant='outlined'>Карта</Button>
            </div>
          </div>
        </Box>
        {<div></div>}
      </div>
    );
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (items?.items.length === 0) {
    return <div>К сожалению, по вашему запросу ничего не найдено</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <div>Найдено дохуя вакансий</div>
        <ul>
          {items?.items.map((item) => (
            <li key={item.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component='img'
                  height='140'
                  image={item.employer?.logo_urls?.['240']}
                  alt='green iguana'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {item.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {item.snippet?.requirement}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {item.snippet?.responsibility}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small'>Learn More</Button>
                </CardActions>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
