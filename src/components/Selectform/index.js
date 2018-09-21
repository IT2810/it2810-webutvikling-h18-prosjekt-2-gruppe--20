import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const isSelected = (category, selectedCategory) => (
  selectedCategory ? category === selectedCategory : false
);

const SelectForm = ({
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

  return <div className='selectedform'>
            <strong className='selectedform__title'>{categoryName}</strong>
            {categories.map(category => <label className='selectedform__label'
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

SelectForm.propTypes = {
  categories: PropTypes.arrayOf(formShape),
  catagoryName: PropTypes.string,
  selected: formShape,
  onChange: PropTypes.func,
};

export default SelectForm;
