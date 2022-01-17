import {
  Map,
  Placemark,
  Clusterer,
  GeoObject,
  ZoomControl,
  SearchControl,
} from 'react-yandex-maps';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Vacancies } from '../../types';
import { loadMapVacanciesAction } from '../../redux/actions';

export default function VacancyMap() {
  const [boundState, setBoundState] = useState([
    [55.7, 37.6],
    [55.8, 37.7],
  ]);

  const dispatch = useDispatch();

  const vacancies = useSelector((state: Vacancies) => state);
  const { items } = vacancies;
  const filteredItems = items.filter(
    (item) =>
      item.address && item?.address?.lat !== null && item?.address?.lng !== null
  );

  const chlen = 'chlen';

  function mapVacanciesDispatch() {
    dispatch({ type: 'SET_MAP_SEARCH_VALUE', payload: boundState });
    dispatch(loadMapVacanciesAction());
  }

  function onBoundsChange(e) {
    // const map = e.get('map');
    const coords = e.get('newBounds');
    // const center = map.getCenter();
    // const zoom = map.getZoom();
    setBoundState(coords);
    mapVacanciesDispatch();
    // console.log(bounds);
  }

  useEffect(() => {
    mapVacanciesDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('Фильтрованное', filteredItems);

  return (
    <div className='map'>
      <Map
        instanceRef={(map) => map}
        onBoundsChange={onBoundsChange}
        defaultState={{ center: [55.75, 37.57], zoom: 12 }}
        style={{ width: 1040, height: 620 }}
      >
        <ZoomControl />
        <SearchControl />
        <Clusterer>
          {filteredItems.map((item) => {
            return (
              <Placemark
                geometry={[item.address.lat, item.address.lng]}
                properties={{
                  balloonContentBody: [
                    '<address>',
                    `<strong>${item.name}</strong>`,
                    '<br/>',
                    `Адрес: ${item?.address?.raw ? item.address.raw : ''} `,
                    '<br/>',
                    `<a href="#/vacancy/${item.id}" target=_blank>Подробнее</a>`,
                    '</address>',
                    '<br/>',
                    `${item.snippet.requirement}`,
                    '<br/>'
                  ].join(''),
                }}
                key={item.id}
              />
            );
          })}
        </Clusterer>
      </Map>
    </div>
  );
}
