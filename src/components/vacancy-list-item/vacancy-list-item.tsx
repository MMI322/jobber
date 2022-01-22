import { Card } from '@mui/material';
import { Vacancy } from '../../types';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export function VacancyListItem({
  employer,
  name,
  snippet,
  salary,
  id,
  address,
}: Vacancy) {
  return (
    <Card
      className='card'
      variant='outlined'
      sx={{
        borderRadius: 2,
        fontFamily: 'Roboto',
        border: 2,
        borderColor: '#C4C4C4',
      }}
    >
      <CardContent className='card-content'>
        <Typography color='#C4C4C4' sx={{ fontSize: 12 }} gutterBottom>
          Лучшее по вашему запросу
        </Typography>
        <Typography
          color='#1976D2'
          className='card_header'
          sx={{ fontSize: 26 }}
          gutterBottom
        >
          {name}
        </Typography>
        {employer.name && address?.street && address?.street !== null ? (
          <Typography gutterBottom>
            {employer.name}, {address.street}
          </Typography>
        ) : null}
        <Typography
          variant='body2'
          color='text.secondary'
          className='card_snippet_1'
          dangerouslySetInnerHTML={{ __html: snippet?.requirement }}
          sx={{ fontSize: 15, color: '#000' }}
          gutterBottom
        ></Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          className='card_snippet_2'
          dangerouslySetInnerHTML={{ __html: snippet?.responsibility }}
          sx={{ fontSize: 15, color: '#000' }}
          gutterBottom
        ></Typography>
        <Typography
          color='text.secondary'
          className='card_salary'
          gutterBottom
          sx={{ fontSize: 15, color: '#000' }}
        >
          {salary?.from} - {salary?.to} {salary?.currency}
        </Typography>
        <Link to={'/vacancy/' + id}>
          <Typography gutterBottom sx={{ fontSize: 12, color: '#1976D2' }}>
            Узнать подробнее
          </Typography>
        </Link>
      </CardContent>
      <div className='card_image'>
        {employer?.logo_urls?.['240'] ? (
          <CardMedia
            className='card_media'
            component='img'
            image={employer?.logo_urls?.['240']}
            alt={employer?.name}
          />
        ) : (
          <div className='default-image'></div>
        )}
      </div>
    </Card>
  );
}
