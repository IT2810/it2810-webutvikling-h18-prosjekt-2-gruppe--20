import React, { Component } from 'react';
import PropTypes from 'prop-types';

import XmlPresenter from './XmlPresenter';
import TextPresenter from './TextPresenter';
import AudioPresenter from './AudioPresenter';

import './index.css';

export default class ArtPresenter extends Component {
  static propTypes = {
    xmlString: PropTypes.string,
    text: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }),
    audioFilePath: PropTypes.string,
  };

  static defaultProps = {
    xmlString: null,
    text: null,
    audioFilePath: null,
  };

  render() {
    return <div className="artpresenter">
      <XmlPresenter className="artpresenter__image" xmlString={this.props.xmlString}/>
      <TextPresenter text={this.props.text} className="artpresenter__text"/>
      <AudioPresenter audioFilePath={this.props.audioFilePath} className="artpresenter__audio"/>
    </div>;
  }
}
