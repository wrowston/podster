import React from 'react';
import logo from './logo.svg';
import './App.css';
import podcastSampleData from './podcastSampleData.js'

function App() {
  return (
    <div className="App">
      <h1>Podcasts</h1>
      {podcastSampleData.map(podcast => {
        return (
          <div>
            <img src={podcast.image} />
            <h1>{podcast.name}</h1>
            <h3>{podcast.creator}</h3>
            <div>{podcast.description}</div>
            <div>{podcast.genre}</div>
            <div>{podcast.rating}</div>
            <div>{podcast.followers}</div>

          </div>
        )
      })}
    </div>
  );
}

export default App;
