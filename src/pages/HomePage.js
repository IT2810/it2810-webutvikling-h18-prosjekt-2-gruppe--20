import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import ArtPresenter from '../components/ArtPresenter';

import { getFileNames } from '../utils/mediaMatcher';
import fetchImageByCache from '../utils/api/imageApi';
import fetchTextByCache from '../utils/api/textApi';
import getAudioUrl from '../utils/api/audioApi';
import SelectForm from '../components/Selectform';

const categories = {
  img: [
    {
      id: '1',
      label: 'Silhouette',
    },
    {
      id: '2',
      label: 'Drawing',
    },
    {
      id: '3',
      label: 'Colored',
    },
  ],
  audio: [
    {
      id: '1',
      label: 'Kort',
    },
    {
      id: '2',
      label: 'Medium',
    },
    {
      id: '3',
      label: 'Lang',
    },
  ],
  text: [
    {
      id: '1',
      label: 'Limeric',
    },
    {
      id: '2',
      label: 'Haiku',
    },
    {
      id: '3',
      label: 'Didactic Cinquain',
    },
  ],
};

const tabs = [
  {
    id: 'tab1',
    label: 'Guitar',
  },
  {
    id: 'tab2',
    label: 'Scuba Diving',
  },
  {
    id: 'tab3',
    label: 'Elephant',
  },
  {
    id: 'tab4',
    label: 'Tanks',
  },
];

export default class HomePage extends Component {
  state = {
    selectedTab: tabs[0],
    categories: [],
    currentImage: null,
    currentText: null,
    currentAudio: null,
    selectedSoundCategory: categories.audio[0],
    selectedImgCategory: categories.img[0],
    selectedTextCategory: categories.text[0],
  };

  componentDidMount() {
    this.fetchFiles();
  }

  componentDidUpdate(prevProps, prevState) {
    const imageHasChanged = prevState.selectedImgCategory !== this.state.selectedImgCategory;
    const audioHasChanged = prevState.selectedSoundCategory !== this.state.selectedSoundCategory;
    const textHasChanged = prevState.selectedTextCategory !== this.state.selectedTextCategory;
    const tabHasChanged = prevState.selectedTab !== this.state.selectedTab;

    if (!imageHasChanged && !audioHasChanged && !textHasChanged && !tabHasChanged) {
      console.info('Old and new state are equal. Skipping...');
      return;
    }

    this.fetchFiles();
  }

  fetchFiles = () => {
    const { img, txt, aud } = getFileNames(
      tabs.indexOf(this.state.selectedTab),
      categories.img.indexOf(this.state.selectedImgCategory),
      categories.audio.indexOf(this.state.selectedSoundCategory),
      categories.text.indexOf(this.state.selectedTextCategory),
    );

    const currentAudio = getAudioUrl(aud);

    Promise.all([
      fetchTextByCache(txt),
      fetchImageByCache(img),
    ]).then(([currentText, currentImage]) => this.setState({
      currentImage,
      currentText,
      currentAudio,
    }));
  };

  changeTab = (newTab) => {
    this.setState({ selectedTab: newTab });
  };

  changeRadio = field => (newRadio) => {
    const state = {};
    state[field] = newRadio;

    this.setState(state);
  };

  render() {
    return <main>
      <header>
        <NavBar tabs={tabs} selected={this.state.selectedTab} onSelect={this.changeTab}/>
      </header>
      <div>
        <SelectForm radios={categories.audio}
                    catagoryName="Lyd"
                    selected={this.state.selectedSoundCategory}
                    onChange={this.changeRadio('selectedSoundCategory')}/>
        <SelectForm radios={categories.img}
                    catagoryName="Bilde"
                    selected={this.state.selectedImgCategory}
                    onChange={this.changeRadio('selectedImgCategory')}/>
        <SelectForm radios={categories.text}
                    catagoryName="Tekst"
                    selected={this.state.selectedTextCategory}
                    onChange={this.changeRadio('selectedTextCategory')}/>
      </div>
      <ArtPresenter xmlString={this.state.currentImage}
                    text={this.state.currentText}
                    audioFilePath={this.state.currentAudio}/>
    </main>;
  }
}
