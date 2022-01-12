import { Map, YMaps, Placemark } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { Vacancies, Vacancy } from '../../types';

export default function VacancyMap() {
  const vacancies = useSelector((state: Vacancies) => state);
  const { items } = vacancies;

  return (
    <Map
      defaultState={{ center: [55.75, 37.57], zoom: 9 }}
      max-width='1040px'
      height='720px'
      style={{ margin: 'auto' }}
    >
      {/* {items.map((item: Vacancy) => (
        <Placemark
          geometry={[item.address?.lat]}
          properties={{
            balloonContent: 'цвет <strong>голубой</strong>',
            iconCaption: 'Очень длиннный, но невероятно интересный текст',
          }}
          options={{
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '50',
          }}
          key={item.id}
        ></Placemark>
      ))} */}
      <Placemark
        geometry={[55.695032, 37.591225]}
        properties={{
          balloonContent: 'цвет <strong>голубой</strong>',
          iconCaption: 'Очень длиннный, но невероятно интересный текст',
        }}
        options={{
          preset: 'islands#blueCircleDotIconWithCaption',
          iconCaptionMaxWidth: '50',
        }}
      ></Placemark>
    </Map>
  );
}
