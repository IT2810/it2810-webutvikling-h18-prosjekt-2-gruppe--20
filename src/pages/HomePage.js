import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import ArtPresenter from '../components/ArtPresenter';

import { getFileNames } from '../utils/mediaMatcher';
import fetchImageByCache from '../utils/api/imageApi';
import fetchTextByCache from '../utils/api/textApi';
import getAudioUrl from '../utils/api/audioApi';
import RadioCategories from '../components/RadioCategories';

const categories = {
  img: [
    {
      label: 'Silhouette',
    },
    {
      label: 'Drawing',
    },
    {
      label: 'Colored',
    },
  ],
  audio: [
    {
      label: 'Kort',
    },
    {
      label: 'Medium',
    },
    {
      label: 'Lang',
    },
  ],
  text: [
    {
      label: 'Limeric',
    },
    {
      label: 'Haiku',
    },
    {
      label: 'Did. Cinquain',
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
    selectedTab: tabs[Math.floor(Math.random() * 4)],
    categories: [],
    currentImage: null,
    currentText: null,
    currentAudio: null,
    selectedSoundCategory: categories.audio[Math.floor(Math.random() * 3)],
    selectedImgCategory: categories.img[Math.floor(Math.random() * 3)],
    selectedTextCategory: categories.text[Math.floor(Math.random() * 3)],
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

    Promise
      .all([fetchTextByCache(txt), fetchImageByCache(img)])
      .then(([currentText, currentImage]) => this.setState({
        currentImage,
        currentText,
        currentAudio,
      }));
  };

  changeTab = (newTab) => {
    this.setState({ selectedTab: newTab });
  };

  changeCategory = field => (newCategory) => {
    const state = {};
    state[field] = newCategory;

    this.setState(state);
  };

  render() {
    return <main>
      <header className="centered-horizontal centered-horizontal-nowrap">
        <NavBar tabs={tabs} selected={this.state.selectedTab} onSelect={this.changeTab}/>
      </header>
      <div className="centered-horizontal">
        <RadioCategories categories={categories.audio}
                    categoryName="Lyd"
                    selected={this.state.selectedSoundCategory}
                    onChange={this.changeCategory('selectedSoundCategory')}/>
        <RadioCategories categories={categories.img}
                    categoryName="Bilde"
                    selected={this.state.selectedImgCategory}
                    onChange={this.changeCategory('selectedImgCategory')}/>
        <RadioCategories categories={categories.text}
                    categoryName="Tekst"
                    selected={this.state.selectedTextCategory}
                    onChange={this.changeCategory('selectedTextCategory')}/>
      </div>
      <ArtPresenter xmlString={this.state.currentImage}
                    text={this.state.currentText}
                    audioFilePath={this.state.currentAudio}/>
    </main>;
  }
}
