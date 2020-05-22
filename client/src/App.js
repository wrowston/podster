import React from 'react';
import './App.css';
import Home from './components/Home';
import AllPodcast from './components/AllPodcast.js';
import SinglePodcast from './components/SinglePodcast.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import UserLogin from './components/UserLogin';
import SingleEpisode from './components/SingleEpisode.js'

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
          <Route exact path='/login' component={UserLogin} />

          <Route exact path='/podcast'>
            <AllPodcast />
          </Route>

          <Route exact path='/podcast/:podcastId' component={SinglePodcast} />

          <Route exact path='/episode/:episodeId' component={SingleEpisode} />
        </Switch>

      </Router>

    </div >
  );
}

export default App;
