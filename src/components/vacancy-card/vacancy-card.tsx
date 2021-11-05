import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Vacancy } from '../../types';

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
  let { id } = useParams<{ id: string }>();

  const [vacancy, setVacancy] = useState<Vacancy>();

  useEffect(() => {
    loadVacancies(id, setVacancy);
  }, [id]);

  return (
    <div>
      Id: {id}
      {JSON.stringify(vacancy)}
    </div>
  );
}
