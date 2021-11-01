import { Vacancies, Vacancy } from '../../types';
import VacancyListItem from '../vacancy-list-item/vacancy-list-item';

export default function VacancyList({
  vacancies,
  isLoading,
}: {
  isLoading: boolean;
  vacancies?: Vacancies;
}) {
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (!vacancies) {
    return null;
  }
  if (vacancies.items.length === 0) {
    return <div>К сожалению, по вашему запросу ничего не найдено</div>;
  }
  const { items, page, per_page, found, pages } = vacancies;
  return (
    <div>
      <div className='dohuya'>Найдено {found} вакансий, иди работать</div>
      <div className='list'>
        {items.map((item: Vacancy) => (
          <VacancyListItem {...item} key={item.id}></VacancyListItem>
        ))}
      </div>
      <div>Page {page}</div>
    </div>
  );
}
