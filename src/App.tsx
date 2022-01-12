import { Header } from './components/header/header';
import { VacancyCard } from './components/vacancy-card/vacancy-card';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { YMaps } from 'react-yandex-maps';
import VacancyMap from './components/vacancy-map/vacancy-map';
import { VacancyList } from './components/vacancy-list/vacancy-list';
import './style.css';

export default function App() {
  return (
    <YMaps>
      <Router>
        <Header />
        <Route path='/' exact>
          <VacancyList />
        </Route>
        <Route path='/map'>
          <VacancyMap />
        </Route>
        <Route path='/vacancy/:id'>
          <VacancyCard />
        </Route>
      </Router>
    </YMaps>
  );
}
