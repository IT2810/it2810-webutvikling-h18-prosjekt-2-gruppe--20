import React, { Component } from 'react';

import HomePage from './pages/HomePage';

import './App.css';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="App">
      <header>
        <h1 className="App-title">Prosjekt 2 - Kunstgenerator</h1>
      </header>
      <HomePage/>
      <footer>
        <p>2018 © le-art</p>
      </footer>
    </div>;
  }
}

export default App;
