import PropTypes from 'prop-types';
import React from 'react';
import Tab from './Tab';

const isSelected = (currentTab, selectedTab) => (
  selectedTab ? currentTab.id === selectedTab.id : false
);

const NavBar = ({ tabs, selected = null, onSelect = () => null }) => {
  const selectHandler = tab => () => {
    if (isSelected(tab, selected)) {
      return;
    }

    onSelect(tab);
  };

  return <div>
    {tabs.map(tab => <Tab
      key={`tab-${tab.id}`}
      id={tab.id}
      isActive={isSelected(tab, selected)}
      onClick={selectHandler(tab)}>{tab.label}</Tab>)}
  </div>;
};

const tabShape = PropTypes.shape({
  id: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
});

NavBar.propTypes = {
  tabs: PropTypes.arrayOf(tabShape),
  selected: tabShape,
  onSelect: PropTypes.func,
};

export default NavBar;
