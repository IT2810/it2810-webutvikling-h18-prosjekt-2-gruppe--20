import React from 'react';
import PropTypes from 'prop-types';

const AudioPlayer = ({ audioFilePath = null, ...props }) => {
  if (!audioFilePath) {
    return '';
  }
  return <div {...props}><audio src={audioFilePath} controls autoPlay></audio></div>;
};

AudioPlayer.propTypes = {
  audioFilePath: PropTypes.string,
};

export default AudioPlayer;
