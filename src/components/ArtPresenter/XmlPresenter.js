import React from 'react';
import PropTypes from 'prop-types';

// function parseSVG(svgString) {
//   const parser = new DOMParser();
//
//   return parser.parseFromString(svgString, 'image/svg+xml');
// }

const XmlPresenter = ({ xmlString = null, ...props }) => {
  if (!xmlString) {
    return null;
  }

  return <div {...props} dangerouslySetInnerHTML={{ __html: xmlString }} />;
};

XmlPresenter.propTypes = {
  xmlString: PropTypes.string,
};

export default XmlPresenter;
