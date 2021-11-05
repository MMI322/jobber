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
}: Vacancy) {
  return (
    <Card className='card'>
      <CardContent>
        <Typography
          color='text.secondary'
          className='card_header'
          gutterBottom
          variant='h4'
        >
          {name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          className='card_snippet_1'
          dangerouslySetInnerHTML={{ __html: snippet?.requirement }}
        ></Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          className='card_snippet_2'
          dangerouslySetInnerHTML={{ __html: snippet?.responsibility }}
        ></Typography>
        <Typography variant='h6' color='text.secondary' className='card_salary'>
          {salary?.from} - {salary?.to} {salary?.currency}
        </Typography>
        <Link to={'/vacancy/' + id}>Узнать подробнее</Link>
      </CardContent>
      <div className='card_image'>
        <CardMedia
          className='card_media'
          component='img'
          image={employer?.logo_urls?.['240']}
          alt={employer?.name}
        />
      </div>
    </Card>
  );
}
