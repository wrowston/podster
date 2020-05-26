import React from 'react';
import './App.css';
import Home from './components/Home';
import AllPodcast from './components/podcast/AllPodcast.js';
import SinglePodcast from './components/podcast/SinglePodcast.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import UserLogin from './components/user/UserLogin.js'
import SingleEpisode from './components/episode/SingleEpisode.js'
import AllCreators from './components/creator/AllCreators.js'
import NewCreator from './components/creator/NewCreator.js'
import CreatorProfile from './components/creator/CreatorProfile.js'
import UserProfile from './components/user/UserProfile';
import NewUser from './components/user/NewUser';
import AllUsers from './components/user/AllUsers';

function App() {
  return (
    <div className="App">
      <h1>Podster</h1>
      <Router>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/explore'>Explore</Link>
          <Link to='/creators'>Creators</Link>
          <Link to='/users'>Users</Link>
        </nav>
        <Switch>

          <Route exact path='/' component={Home} />

          <Route exact path='/login' component={UserLogin} />
          <Route exact path='/userSignUp' component={NewUser} />
          <Route exact path='/user/:userId' component={UserProfile} />

          <Route exact path='/creatorSignUp' component={NewCreator} />
          <Route exact path='/creator/:creatorId' component={CreatorProfile} />

          <Route exact path='/explore'>
            <AllPodcast />
          </Route>

          <Route exact path='/podcast/:podcastId' component={SinglePodcast} />

          <Route exact path='/episode/:episodeId' component={SingleEpisode} />

          <Route exact path='/creators' component={AllCreators} />
          <Route exact path='/users' component={AllUsers} />
        </Switch>

      </Router>

    </div >
  );
}

export default App;
