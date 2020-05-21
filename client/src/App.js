import React from 'react';
import './App.css';
import Home from './components/Home';
import BrowsePodcast from './components/BrowsePodcast';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>Podster</h1>
      <Router>
        <Switch>

          <Route exact path='/' component={Home} />

          <Route exact path='/podcast'>
            <BrowsePodcast />
          </Route>
        </Switch>

      </Router>

    </div>
  );
}

export default App;
