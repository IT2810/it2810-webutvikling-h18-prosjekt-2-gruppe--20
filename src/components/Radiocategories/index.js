import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const isSelected = (category, selectedCategory) => (
  selectedCategory ? category === selectedCategory : false
);

const RadioCategories = ({
  categories,
  categoryName,
  selected,
  onChange,
}) => {
  const changeHandler = category => () => {
    if (isSelected(category, selected)) {
      return;
    }

    onChange(category);
  };

  return <div className='radiocategories'>
            <strong className='radiocategories__title'>{categoryName}</strong>
            {categories.map(category => <label className='radiocategories__label'
                                        key={category.label}>{category.label}
                                            <input type='radio'
                                                    value={category.label}
                                                    checked={isSelected(category, selected)}
                                                    onChange={changeHandler(category)}>
                                            </input>
            </label>)}
        </div>;
};

const formShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
});

RadioCategories.propTypes = {
  categories: PropTypes.arrayOf(formShape),
  categoryName: PropTypes.string,
  selected: formShape,
  onChange: PropTypes.func,
};

export default RadioCategories;
