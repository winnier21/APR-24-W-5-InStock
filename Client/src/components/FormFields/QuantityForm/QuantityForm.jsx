import React from 'react';
import './QuantityForm.scss';

const QuantityForm = ({ formData, setFormData, activeField, setActiveField, errors }) => {
  return (
    <div className="item-quantity">
      <label className='label-text'>Quantity</label>
      <div className="item-input">
        <input
          type="number"
          className="item-input--quantity"
          id="quantity"
          value={formData.quantity}
          onChange={(e) => {
            const quantity = parseInt(e.target.value, 10);
            setFormData({
              ...formData,
              quantity,
            });
          }}
          onFocus={() => setActiveField('quantity')}
          onBlur={() => setActiveField(null)}
        />
        {errors.quantity && <div className="error">{errors.quantity}</div>}
      </div>
    </div>
  );
};

export default QuantityForm;