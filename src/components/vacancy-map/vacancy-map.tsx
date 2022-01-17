import { Map, Placemark, Clusterer } from 'react-yandex-maps';
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

  function onBoundsChange(e) {
    const map = e.get('map');
    const coords = map.getBounds();
    // const center = map.getCenter();
    // const zoom = map.getZoom();
    setBoundState(coords);
    dispatch({ type: 'SET_MAP_SEARCH_VALUE', payload: boundState });
    dispatch(loadMapVacanciesAction());
    // console.log();
    // console.log(coords);
  }

  useEffect(() => {
    dispatch({ type: 'SET_MAP_SEARCH_VALUE', payload: boundState });
    dispatch(loadMapVacanciesAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('Фильтрованное', filteredItems);

  return (
    <div className='map'>
      <Map
        instanceRef={(map) => map}
        onBoundsChange={onBoundsChange}
        defaultState={{ center: [55.75, 37.57], zoom: 12 }}
        style={{ width: 1040, height: 620 }}
      >
        <Clusterer>
          {filteredItems.map((item) => {
            return (
              <Placemark
                geometry={[item.address.lat, item.address.lng]}
                options={{
                  // preset: 'islands#blueCircleDotIconWithCaption',
                  iconCaptionMaxWidth: '100',
                  // openEmptyBaloon: true,
                }}
                properties={{
                  // hintContent: item.salary,
                  balloonContentHeader: item.name
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
