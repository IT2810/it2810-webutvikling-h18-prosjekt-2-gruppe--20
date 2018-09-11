import React from 'react';
import PropTypes from 'prop-types';

const TextPresenter = ({ jsonString = null, ...props }) => {
  if (!jsonString) {
    return null;
  }

  const poem = JSON.parse(jsonString);

  return <div {...props}>{poem.text}</div>;
};
TextPresenter.propTypes = {
  jsonString: PropTypes.string,
};

export default TextPresenter;
