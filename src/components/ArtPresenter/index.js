import React, { Component } from 'react';
import PropTypes from 'prop-types';

import XmlPresenter from './XmlPresenter';
import TextPresenter from './TextPresenter';

import './index.css';

export default class ArtPresenter extends Component {
  static propTypes = {
    xmlString: PropTypes.string,
    text: PropTypes.string,
  };

  static defaultProps = {
    xmlString: null,
    text: null,
  };

  render() {
    return <div className="artpresenter">
      <XmlPresenter className="artpresenter__image" xmlString={this.props.xmlString}/>
      <TextPresenter jsonString={JSON.stringify({ text: 'Hello world' })} className="artpresenter__text"/>
    </div>;
  }
}
