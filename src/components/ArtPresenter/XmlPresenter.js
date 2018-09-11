import React from 'react';
import PropTypes from 'prop-types';

const XmlPresenter = ({ xmlString = null, ...props }) => {
  if (!xmlString) {
    return null;
  }

  // Rendering svg through setting innerHTML is an option,
  // but to prevent XSS should be try to find a better solution
  return <div {...props} dangerouslySetInnerHTML={{ __html: xmlString }} />;
};

XmlPresenter.propTypes = {
  xmlString: PropTypes.string,
};

export default XmlPresenter;
