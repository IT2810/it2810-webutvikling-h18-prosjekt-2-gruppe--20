import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import ArtPresenter from '../components/ArtPresenter';

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
    currentImage: null,
  };

  componentDidMount() {
    fetch('/Abraham_Lincoln_clip_art.svg')
      .then(res => res.text())
      .then(data => this.setState({ currentImage: data }));
  }

  changeTab = (newTab) => {
    this.setState({ selectedTab: newTab });
  };

  render() {
    return <main>
      <header>
        <NavBar tabs={this.tabs} selected={this.state.selectedTab} onSelect={this.changeTab}/>
      </header>
      <ArtPresenter xmlString={this.state.currentImage}/>
    </main>;
  }
}
