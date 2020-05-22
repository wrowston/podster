import React from 'react';
import './App.css';
import Home from './components/Home';
import AllPodcast from './components/AllPodcast.js';
import SinglePodcast from './components/SinglePodcast.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import UserLogin from './components/UserLogin.js'
import SingleEpisode from './components/SingleEpisode.js'
import AllCreators from './components/AllCreators.js'
import NewCreator from './components/NewCreator';
import CreatorProfile from './components/CreatorProfile';

function App() {
  return (
    <div className="App">
      <h1>Podster</h1>
      <Router>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/podcast'>Browse</Link>
          <Link to='/creators'>Creators</Link>
        </nav>
        <Switch>

          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={UserLogin} />
          <Route exact path='/creatorSignUp' component={NewCreator} />
          <Route exact path='/creator/:creatorId' component={CreatorProfile} />

          <Route exact path='/podcast'>
            <AllPodcast />
          </Route>

          <Route exact path='/podcast/:podcastId' component={SinglePodcast} />

          <Route exact path='/episode/:episodeId' component={SingleEpisode} />

          <Route exact path='/creators' component={AllCreators} />
        </Switch>

      </Router>

    </div >
  );
}

export default App;
