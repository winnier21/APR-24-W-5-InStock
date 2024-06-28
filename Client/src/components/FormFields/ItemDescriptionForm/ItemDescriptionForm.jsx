import React from 'react';
import './ItemDescriptionForm.scss';

const ItemDescriptionForm = ({ formData, setFormData, activeField, setActiveField, errors }) => {
  return (
    <div className="item-detail">
      <label className='label-text'>Description </label>
      <div className="item-input">
        <textarea
          className='item-input--description'
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value })}
          onFocus={() => setActiveField('description')}
          onBlur={() => setActiveField(null)}
          placeholder="Please enter a brief item description..." 
        />
        {errors.description && <div className="error">{errors.description}</div>}
      </div>
    </div>
  );
};

export default ItemDescriptionForm;