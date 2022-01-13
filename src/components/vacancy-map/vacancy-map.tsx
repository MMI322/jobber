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
  // let reducedPlacemarks;

  function onBoundsChange(e) {
    const map = e.get('map');
    const coords = map.getBounds();
    // const center = map.getCenter();
    // const zoom = map.getZoom();
    setBoundState(coords);
    dispatch({ type: 'SET_MAP_SEARCH_VALUE', payload: boundState });
    dispatch(loadMapVacanciesAction());

    // reducedPlacemarks = items
    //   .reduce((acc, item) => [...acc, [item.address.lat, item.address.lng]], [])
    //   .filter((item) => item[0] !== null && item[1] !== null);
  }

  useEffect(() => {
    dispatch(loadMapVacanciesAction());
  }, []);

  // console.log(
  //   items
  //     .reduce((acc, item) => [...acc, [item.address.lat, item.address.lng]], [])
  //     .filter((item) => item[0] !== null && item[1] !== null)
  // );

  return (
    <div className='map'>
      <Map
        instanceRef={(map) => map}
        onBoundsChange={onBoundsChange}
        defaultState={{ center: [55.75, 37.57], zoom: 12 }}
        style={{ width: 1040, height: 620 }}
      >
        {/* {items
          .reduce(
            (acc, item) => [...acc, [item.address.lat, item.address.lng]],
            []
          )
          .filter((item) => item[0] !== null && item[1] !== null)
          .map((item) => {
            return <Placemark geometry={item} />;
          })} */}
        <Clusterer>
          {items.map((item) => {
            return item?.address?.lat !== null &&
              item?.address?.lng !== null ? (
              <Placemark
                geometry={[item.address.lat, item.address.lng]}
                options={{ preset: 'islands#circleDotIcon', hasBalloon: true }}
                key={item.id} 
              />
            ) : null;
          })}
        </Clusterer>
      </Map>
    </div>
  );
}
