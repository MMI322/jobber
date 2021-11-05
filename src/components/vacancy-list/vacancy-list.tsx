import { Vacancies, Vacancy } from '../../types';
import { VacancyListItem } from '../vacancy-list-item/vacancy-list-item';

export function VacancyList({ vacancies }: { vacancies?: Vacancies }) {
  if (!vacancies) {
    return null;
  }
  if (vacancies.items.length === 0) {
    return <div>Ничего не найдено, сиди на жопе</div>;
  }
  const { items, page, found } = vacancies;
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
