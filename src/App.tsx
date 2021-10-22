import React, { useState, useEffect } from 'react';
import { Vacancies } from './types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function App() {
  const [error, setError] = useState<null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Vacancies>();
  const [searchValue, setSeacrhValue] = useState('');
  const [metroStations, setMetroStations] = useState();



  function setVacancies() {
    fetch(`https://api.hh.ru/vacancies?text=${searchValue}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  function setMetro() {
    fetch('https://api.hh.ru/metro/1')
      .then(res => res.json())
      .then(
        (result) => {
          setMetroStations(result);
        },
        (error) => {
          setError(error);
        }
      )
  }

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setSeacrhValue(e.target.value)
    console.log(searchValue, e.target.value)
  }

  useEffect(() => {
    setVacancies()
  }, [])

  console.log(items);

  if (!isLoaded) {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={searchValue} onChange={onChangeName} />
        <Button variant="contained" onClick={(e) => { setVacancies() }}>Search</Button>
      </Box>
    )
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <ul>
        {items?.items.map((item) => (
          <li key={item.id} >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.employer?.logo_urls?.['240']}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.snippet?.requirement}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.snippet?.responsibility}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </li>

        ))}
      </ul>
    );
  }
}


export default App;
