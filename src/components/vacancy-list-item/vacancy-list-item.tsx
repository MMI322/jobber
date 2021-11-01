import { Card } from '@mui/material';
import { Vacancies, Vacancy } from '../../types';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function VacancyListItem({ employer, name, snippet }: Vacancy) {
  return (
    <Card className='card'>
      <CardContent>
        <Typography
          color='text.secondary'
          className='card_header'
          gutterBottom
          variant='h5'
        >
          {name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          className='card_snippet_1'
        >
          {snippet?.requirement?.replaceAll(/<(“[^”]*”|'[^’]*’|[^'”>])*>/g, '')}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          className='card_snippet_2'
        >
          {snippet?.responsibility?.replaceAll(
            /<(“[^”]*”|'[^’]*’|[^'”>])*>/g,
            ''
          )}
        </Typography>
      </CardContent>
      <div className='card_image'>
        <CardMedia
          className='card_media'
          component='img'
          image={employer?.logo_urls?.['240']}
          alt='green iguana'
        />
      </div>
    </Card>
  );
}
