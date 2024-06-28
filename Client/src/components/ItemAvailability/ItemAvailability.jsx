import React from 'react';
import ItemSelect from '../FormFields/ItemSelect/ItemSelect';
import QuantityForm from '../FormFields/QuantityForm/QuantityForm';
import './ItemAvailability.scss';
const ItemAvailability = ({ formData, setFormData, activeField, setActiveField, warehouses,errors }) => {
  return (
    <section className="item-availability">
      <h2>Item Availability</h2>
      <div className="item-availability-status">
        <label className="label-text">Status</label>
        <div className="item-status">
          <div className="item-status__check">
            <input
              type="radio"
              id="in_stock"
              value="in_stock"
              className="item-status__check--instock"
            />
            <label className="item-status__check--instock-label" htmlFor="in_stock">
              In stock
            </label>
          </div>
          <div className="item-status__check">
            <input
              type="radio"
              id="out_of_stock"
              value="out_of_stock"
              className="item-status__check--outofstock"
            />
            <label className="item-status__check--outofstock-label" htmlFor="out_of_stock">
              Out of stock
            </label>
          </div>
        </div>
      </div>
      <QuantityForm 
        formData={formData} 
        setFormData={setFormData} 
        activeField={activeField} 
        setActiveField={setActiveField} 
        errors={errors} 
      />
      <ItemSelect 
      formData={formData} 
      setFormData={setFormData} 
      options={warehouses} 
      label="Warehouse" 
      id="warehouse" 
    />
    </section>
  );
};

export default ItemAvailability;