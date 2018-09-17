import React from 'react';
import PropTypes from 'prop-types';

const TextPresenter = ({ text = null, ...props }) => {
  if (!text) {
    return null;
  }

  return <div {...props}>{text.text}</div>;
};
TextPresenter.propTypes = {
  text: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
};

export default TextPresenter;
