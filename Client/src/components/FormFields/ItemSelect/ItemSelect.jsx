import React from 'react';
import './ItemSelect.scss';

const ItemSelect = ({ formData, setFormData, options, label, id , handleStatusChange}) => {
  return (
    <div className="item-detail">
      <label className='label-text'>{label} </label>
      <div className="item-select">   
        <select
          className={`item-select--${id}`}
          id={id}
          value={formData[id]}
          onChange={handleStatusChange}
          >
          <option value="">Please select</option>
          {options.map((option, index) => (
            <option key={`option-${index}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ItemSelect;