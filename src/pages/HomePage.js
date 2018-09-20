import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import ArtPresenter from '../components/ArtPresenter';

import { getFileNames } from '../utils/mediaMatcher';
import fetchImageByCache from '../utils/api/imageApi';
import fetchTextByCache from '../utils/api/textApi';
import getAudioUrl from '../utils/api/audioApi';
import SelectForm from '../components/Selectform';

const categories = {
  img: [{
    id: '1',
    label: 'Option 1',
  },
  {
    id: '2',
    label: 'Option 2',
  },
  {
    id: '3',
    label: 'Option 3',
  }
  ],
  audio: [{
    id: '1',
    label: 'Option 1',
  },
  {
    id: '2',
    label: 'Option 2',
  },
  {
    id: '3',
    label: 'Option 3',
  }],
  text: [{
    id: '1',
    label: 'Option 1',
  },
  {
    id: '2',
    label: 'Option 2',
  },
  {
    id: '3',
    label: 'Option 3',
  }],
};

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
    currentAudio: null,
    selectedSoundCategory: categories.audio[0],
    selectedImgCategory: categories.img[0],
    selectedTextCategory: categories.text[0],
  };

  componentDidMount() {
    const { img, txt, aud } = getFileNames(0, 2);

    const currentAudio = getAudioUrl(aud);

    Promise.all([
      fetchTextByCache(txt),
      fetchImageByCache(img),
    ]).then(([currentText, currentImage]) => this.setState({
      currentImage,
      currentText,
      currentAudio,
    }));
  }

  changeTab = (newTab) => {
    this.setState({ selectedTab: newTab });
  };

  changeRadio = (field) => {
    
    return (newRadio) => {
      const state = {};
      state[field] = newRadio;

      this.setState(state);
    }
  };


  render() {
    return <main>
      <header>
        <NavBar tabs={this.tabs} selected={this.state.selectedTab} onSelect={this.changeTab}/>
      </header>
      <ArtPresenter xmlString={this.state.currentImage}
                    text={this.state.currentText}
                    audioFilePath={this.state.currentAudio}/>
      <SelectForm 
        radios={categories.audio} catagoryName="Lyd"
        selected={this.state.selectedSoundCategory} onChange={this.changeRadio('selectedSoundCategory')} />
      <SelectForm
        radios={categories.img} catagoryName="Bilde"
        selected={this.state.selectedImgCategory} onChange={this.changeRadio('selectedImgCategory')} />
      <SelectForm 
        radios={categories.text} catagoryName="Tekst"
        selected={this.state.selectedTextCategory} onChange={this.changeRadio('selectedTextCategory')}/>
    </main>
  };
}
