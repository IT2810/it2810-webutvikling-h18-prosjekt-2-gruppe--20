import React from 'react';
import PropTypes from 'prop-types';

import './Tab.css';

const Tab = ({
  children, id, onClick, isActive = false,
}) => {
  const clickHandler = () => onClick({ id });

  return <button
    className={`tab ${isActive ? 'tab--active' : ''}`}
    onClick={clickHandler}>{children}</button>;
};

Tab.propTypes = {
  id: PropTypes.any.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default Tab;
