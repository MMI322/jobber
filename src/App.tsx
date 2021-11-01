import Header from './components/header/header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.css';

export default function App() {
  return (
    <Router>
      <Route path='/' exact>
        <Header/>
      </Route>
    </Router>
  );
}
