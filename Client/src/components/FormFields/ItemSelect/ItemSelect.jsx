import React from 'react';
import './ItemSelect.scss';
import DropDownArrow from '../../../assets/icons/arrow_drop_down-24px.svg';

const ItemSelect = ({ formData, setFormData, options, label, id }) => {
  const handleChange = (event) => {
    setFormData({ ...formData, [id]: event.target.value });
  };

  return (
    <div className="item-detail">
      <label className='label-text'>{label} </label>
      <div className="item-select">   
        <select
          className={`item-select--${id}`}
          id={id}
          value={formData[id]}
          onChange={handleChange}

          >
          <option value="">Please select</option>
          {options.map((option, index) => (
            <option key={`option-${index}`} value={option}>
              {option}
            </option>
          ))}
         <div className="custom-select-arrow">
          <img src={DropDownArrow} alt="Arrow" />
        </div> 
        </select>
        
      </div>
    </div>
  );
};

export default ItemSelect;