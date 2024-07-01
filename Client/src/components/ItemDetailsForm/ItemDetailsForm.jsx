// ItemDetails.jsx
import React from 'react';
import ItemNameForm from '../FormFields/ItemNameForm/ItemNameForm';
import ItemDescriptionForm from '../FormFields/ItemDescriptionForm/ItemDescriptionForm';
import ItemSelect from '../FormFields/ItemSelect/ItemSelect';
import './ItemDetailsForm.scss';

const ItemDetails = ({ formData, setFormData, activeField, setActiveField, categories,errors }) => {
  return (
    <section className="form__divider">
            <h2>Item Details</h2>
            <div className="form__divider-detail">
              <label className='label-text'>Item Name </label>
                <input
                  className='form-input'
                  type="text"
                  id="item_name"
                  name="item_name"
                  defaultValue={item_name}
                  placeholder="Item Name"
                />
            </div>
            <div className="form__divider-detail">
              <label className='label-text'>Description </label>
                <textarea
                  className='form-input form-input--description'
                  id="description"
                  defaultValue={description}
                  placeholder="Please enter a brief item description..."
                />
            </div>
            <div className="form__divider-detail form__divider-detail--last">
              <label className='label-text'>Category </label>
                <select
                  className='form-select'
                  id="category"
                  value={selectedCategory || undefined}
                  name="category"
                  onChange={handleCategoryChange}
                >
                  <option value="" placeholder="Please select"> Please select </option>
                  {categories.map((category, index) => (
                    <option key={`category-${index}`} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
            </div>
    </section>
    )
}

export default ItemDetails;
// const ItemDetails = ({ formData, setFormData, activeField, setActiveField, categories,errors }) => {
//   return (
//     <section className="item-details">
//       <h2>Item Details</h2>
//       <ItemNameForm 
//         formData={formData} 
//         setFormData={setFormData} 
//         activeField={activeField} 
//         setActiveField={setActiveField} 
//         errors={errors} 
//       />
//       <ItemDescriptionForm 
//         formData={formData} 
//         setFormData={setFormData} 
//         activeField={activeField} 
//         setActiveField={setActiveField} 
//         errors={errors} 
//       />
//       <ItemSelect 
//         formData={formData} 
//         setFormData={setFormData} 
//         options={categories} 
//         label="Category" 
//         id="category" 
//       />
//     </section>
//   );
// };

// export default ItemDetails;