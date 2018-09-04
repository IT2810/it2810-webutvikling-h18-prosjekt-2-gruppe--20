import React, { Component } from 'react';
import NavBar from '../components/Navbar';

export default class HomePage extends Component {
  tabs = [
    {
      id: 'komedie',
      label: 'Komedie',
    },
    {
      id: 'drama',
      label: 'Drama',
    },
  ];

  state = {
    selectedTab: null,
    categories: [],
  };

  changeTab = (newTab) => {
    this.setState({ selectedTab: newTab });
  };

  render() {
    return <main>
      <header>
        <NavBar tabs={this.tabs} selected={this.state.selectedTab} onSelect={this.changeTab}/>
      </header>
    </main>;
  }
}
