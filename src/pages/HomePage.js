import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import ArtPresenter from '../components/ArtPresenter';

import { getFileNames } from '../utils/mediaMatcher';
import fetchImageByCache from '../utils/api/imageApi';
import fetchTextByCache from '../utils/api/textApi';

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
    currentText: null,
  };

  componentDidMount() {
    const { img } = getFileNames(0, 2);

    Promise.all([
      fetchTextByCache(0),
      fetchImageByCache(img),
    ]).then(([currentText, currentImage]) => this.setState({ currentImage, currentText }));
  }

  changeTab = (newTab) => {
    this.setState({ selectedTab: newTab });
  };

  render() {
    return <main>
      <header>
        <NavBar tabs={this.tabs} selected={this.state.selectedTab} onSelect={this.changeTab}/>
      </header>
      <ArtPresenter xmlString={this.state.currentImage} text={this.state.currentText}/>
    </main>;
  }
}
