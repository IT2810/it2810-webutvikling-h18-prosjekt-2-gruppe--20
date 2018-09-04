import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Hello world</h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage}/>
        </Switch>
      </BrowserRouter>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>;
  }
}

export default App;
