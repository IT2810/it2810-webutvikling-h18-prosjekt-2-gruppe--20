import React, { Component } from 'react';

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      test: 'hello world',
      categories: [],
    };
  }

  render() {
    return <main>
      <h2>Stats</h2>
      {this.state.test}
    </main>;
  }
}
