import { Header } from './components/header/header';
import { VacancyCard } from './components/vacancy-card/vacancy-card';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import { Vacancies } from './types';
import { VacancyList } from './components/vacancy-list/vacancy-list';
import './style.css';

export default function App() {
  const [vacancies, setVacancies] = useState<Vacancies>();

  return (
    <Router>
      <Header setVacancies={setVacancies} />
      <Route path='/' exact>
        <VacancyList vacancies={vacancies} />
      </Route>
      <Route path='/vacancy/:id'>
        <VacancyCard />
      </Route>
    </Router>
  );
}
