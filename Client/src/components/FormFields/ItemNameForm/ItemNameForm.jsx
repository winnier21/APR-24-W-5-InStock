import React from 'react';
import './ItemNameForm.scss';

const ItemNameForm = ({ formData, setFormData, setActiveField, errors }) => {
  return (
    <div className="item-detail">
      <label className='label-text'>Item Name </label>
      <div className="item-input">
        <input
          className='item-input--name'
          type="text"
          id="itemName"
          value={formData.item_name}
          onChange={(e) => setFormData({...formData, item_name: e.target.value })}
          onFocus={() => setActiveField('item_name')}
          onBlur={() => setActiveField(null)}
          placeholder="Item Name" 
        />
        {errors.item_name && <div className="error">{errors.item_name}</div>}
      </div>
    </div>
  );
};

export default ItemNameForm;