// ItemDetails.jsx
import React from 'react';
import ItemNameForm from '../FormFields/ItemNameForm/ItemNameForm';
import ItemDescriptionForm from '../FormFields/ItemDescriptionForm/ItemDescriptionForm';
import ItemSelect from '../FormFields/ItemSelect/ItemSelect';
import './ItemDetailsForm.scss';

const ItemDetails = ({ formData, setFormData, activeField, setActiveField, categories,errors }) => {
  return (
    <section className="item-details">
      <h2>Item Details</h2>
      <ItemNameForm 
        formData={formData} 
        setFormData={setFormData} 
        activeField={activeField} 
        setActiveField={setActiveField} 
        errors={errors} 
      />
      <ItemDescriptionForm 
        formData={formData} 
        setFormData={setFormData} 
        activeField={activeField} 
        setActiveField={setActiveField} 
        errors={errors} 
      />
      <ItemSelect 
        formData={formData} 
        setFormData={setFormData} 
        options={categories} 
        label="Category" 
        id="category" 
      />
    </section>
  );
};

export default ItemDetails;