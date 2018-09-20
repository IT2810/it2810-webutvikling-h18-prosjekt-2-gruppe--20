import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const isSelected = (radio, selectedRadio) => (
  selectedRadio ? radio === selectedRadio : false
);

const SelectForm = ({
  radios,
  catagoryName,
  selected,
  onChange,
}) => {
  const changeHandler = radio => () => {
    if (isSelected(radio, selected)) {
      return;
    }

    onChange(radio);
  };

  return <div className='selectedform'>
            <p className='selectedform__title'>{catagoryName}</p>
            {radios.map(radio => <label className='selectedform__label'
                                        key={`label-${radio.id}`}
                                        id={radio.id}>{radio.label}
                                            <input type='radio'
                                                    value={radio.label}
                                                    checked={isSelected(radio, selected)}
                                                    onChange={changeHandler(radio)}>
                                            </input>
            </label>)}
        </div>;
};

const formShape = PropTypes.shape({
  id: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
});

SelectForm.propTypes = {
  radios: PropTypes.arrayOf(formShape),
  catagoryName: PropTypes.string,
  selected: formShape,
  onChange: PropTypes.func,
};

export default SelectForm;
