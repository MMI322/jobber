import { Header } from './components/header/header';
import { VacancyCard } from './components/vacancy-card/vacancy-card';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { VacancyList } from './components/vacancy-list/vacancy-list';
import './style.css';

export default function App() {
  return (
    <Router>
      <Header />
      <Route path='/' exact>
        <VacancyList />
      </Route>
      <Route path='/vacancy/:id'>
        <VacancyCard />
      </Route>
    </Router>
  );
}
