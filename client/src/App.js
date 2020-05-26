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
      <Router>
        <nav class='navbar'>
          <div class='title'>Podster</div>
          <Link to='/' class='nav-link'>Home</Link>
          <Link to='/explore' class='nav-link'>Explore</Link>
          <Link to='/creators' class='nav-link'>Creators</Link>
        </nav>

        <div class='wrapper'>
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
        </div>
      </Router>

    </div >
  );
}

export default App;
