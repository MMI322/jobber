import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Vacancy } from '../../types';
import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types';
import { loadVacanciesAction } from '../../redux/actions';
import { Map, Placemark, ZoomControl, SearchControl } from 'react-yandex-maps';

function loadVacancies(
  id: string,
  setVacancy: React.Dispatch<React.SetStateAction<Vacancy | undefined>>
) {
  fetch(`https://api.hh.ru/vacancies/${id}`)
    .then((res) => res.json())
    .then((result) => {
      setVacancy(result);
    });
}

export function VacancyCard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const pageValue = useSelector((state: State) => state.page_value);
  let vacancySalary = '';

  function handleGoBack() {
    dispatch(loadVacanciesAction(history.push, pageValue));
  }

  function salaryCheck() {
    if (!vacancy?.salary) {
      vacancySalary = 'Зарплата не указана';
    } else if (vacancy?.salary?.to === null) {
      vacancySalary = `Зарплата от ${vacancy.salary.from} ${vacancy.salary.currency}`;
    } else {
      vacancySalary = `Зарплата от ${vacancy.salary.from} до ${vacancy.salary.to} ${vacancy.salary.currency}`;
    }
  }

  let { id } = useParams<{ id: string }>();

  const [vacancy, setVacancy] = useState<Vacancy>();

  useEffect(() => {
    loadVacancies(id, setVacancy);
  }, [id]);

  salaryCheck();

  return (
    <Container maxWidth='lg'>
      <Button variant='outlined' onClick={handleGoBack}>
        Вернутся к списку вакансий
      </Button>
      <div className='vacancy_card'>
        <div className='card_header'>
          <div className='card_header_data'>
            <h2 className='vacancy_name'>{vacancy?.name}</h2>
            <div className='vacancy_skills'>
              {vacancy?.key_skills
                ? vacancy.key_skills.map((item, key) => {
                    return (
                      <div className='vacancy_key_skill' key={key}>
                        {item.name}
                      </div>
                    );
                  })
                : null}
            </div>
            <div className='salary'>{vacancySalary}</div>
          </div>
          <img
            src={vacancy?.employer?.logo_urls?.[240]}
            alt={vacancy?.employer?.name}
          />
        </div>

        <div className='descrition'>
          <div
            dangerouslySetInnerHTML={
              vacancy?.description
                ? { __html: vacancy?.description }
                : undefined
            }
          />
          {vacancy?.address &&
          vacancy?.address.lat !== null &&
          vacancy?.address.lng !== null ? (
            <div className='card_map'>
              <Map
                defaultState={{
                  center: [vacancy.address?.lat, vacancy.address?.lng],
                  zoom: 12,
                }}
                style={{ width: 1040, height: 620 }}
              >
                <ZoomControl />
                <SearchControl />
                <Placemark
                  geometry={[vacancy.address.lat, vacancy.address.lng]}
                  properties={{
                    balloonContentBody: [
                      '<address>',
                      `<strong>${vacancy.name}</strong>`,
                      '<br/>',
                      `Адрес: ${
                        vacancy?.address?.raw ? vacancy.address.raw : ''
                      } `,
                      '<br/>',
                      `<a href="
                      /vacancy/${vacancy.id}" target=_blank>Подробнее</a>`,
                      '</address>',
                      '<br/>',
                      `${vacancy.snippet?.requirement ? vacancy.snippet?.requirement : ''}`,
                      '<br/>',
                    ].join(''),
                  }}
                />
              </Map>
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
