import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';

import './App.css';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="App">
      <header>
        <h1 className="App-title">Tittel</h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage}/>
        </Switch>
      </BrowserRouter>
      <footer>
        <p>2018 © le-art</p>
      </footer>
    </div>;
  }
}

export default App;
