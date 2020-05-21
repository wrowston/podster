import React from 'react';
import './App.css';
import Home from './components/Home';
import AllPodcast from './components/AllPodcast.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>Podster</h1>
      <Router>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/podcast'>Browse</Link>
        </nav>
        <Switch>

          <Route exact path='/' component={Home} />

          <Route exact path='/podcast'>
            <AllPodcast />
          </Route>
        </Switch>

      </Router>

    </div>
  );
}

export default App;
