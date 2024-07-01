import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './EditItemForm.scss';
import AddButton from '../Button/AddButton/AddButton';
import CancelButton from '../Button/CancelButton/CancelButton';
import apiInstance from '../../utils/ApiClient';
  
const EditForm = ({ itemObject, warehousesProps, requestMethod }) => {
  const navigate = useNavigate();
  const {
    id, warehouse_name, item_name, description, category, status, quantity
  } = itemObject;
  const { warehousesArray } = warehousesProps;
  const warehouses = warehousesArray.map(object => object.warehouse_name);
  const warehouseId = warehousesArray.find(
    warehouseObject => warehouseObject.warehouse_name === warehouse_name
  )?.id || null;
  
  const [formData, setFormData] = useState({
    warehouse_id: warehouseId,
    item_name: item_name,
    description: description,
    category: category,
    status: status || 'In Stock',
    // status: status || (quantity > 0 ? 'In Stock' : 'Out of Stock'),
    quantity: quantity || 0
  });
  const [errorState, setErrorState] = useState({
    warehouse_id: null,
    item_name: null,
    description: null,
    category: null,
    status: null,
    quantity: null
  });
  // const [selectedCategory, setSelectedCategory] = useState(category || null);
  const [formQuantity, setFormQuantity] = useState(formData.quantity || 0);
  // const [selectedStatus, setSelectedStatus] = useState(
  //   formQuantity > 0 ? 'In Stock' : 'Out of Stock'
  // );
  // const [selectedWarehouse, setSelectedWarehouse] = useState(warehouse_name);
  
  const categories = ['Electronics', 'Apparel', 'Accessories', 'Health', 'Gear'];
  const errorClassName = "error";

  const handleChange = async (event) => {
    const { name, value } = event.target;
    console.log(name)
    setFormData({
      ...formData, [name]: value
    })
  }
  console.log(formData)

  const validateForm = async () => {
    let errors = {};
    let enteredQuantity = formData.quantity;
    if (formData.status === 'Out of Stock') {
      enteredQuantity = 0;
      setFormData({ ...formData, quantity: 0 });
    }
    errors = {
      "warehouse name": !formData.warehouse_name,
      "item name": formData.item_name?.length < 3 || !formData.item_name,
      description: formData.description?.length < 3 || !formData.description,
      category: formData.category?.length < 3 || !formData.category,
      quantity: enteredQuantity < 0 || typeof enteredQuantity !== 'number'
    };
    setErrorState(errors);
    const propertiesWithErrors = Object.keys(errors).filter(key => {
      return errors[key] == true;
    })
    alert(`Invalid input for ${propertiesWithErrors.join(', ')}`)

    return !Object.values(errors).includes(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validFormSubmission = await validateForm();
    
    // const category = event.target.category.value;
    // if (!category) {
    //   alert('Please select a category.');
    // }
    // const warehouse_name = event.target.warehouse_name.value;
    // if (!warehouse_name) {
    //   alert('Please select a warehouse');
    // }
    // const quantity = parseInt(event.target.quantity?.value) || 0;
    // if (quantity < 1 && formData.status === 'In Stock') {
    //   alert('Please enter a non-zero number.');
    // }
    // const item_name = event.target.item_name.value;
    // const description = event.target.description.value;

    // const formTextFields = [
    //   'item_name', 'description', 'category'
    // ]
    // const warehouseId = warehousesArray.find(
    //   warehouseObject => warehouseObject.warehouse_name === warehouse_name
    // )?.id;
    // const submittedItem = {
    //   warehouse_id: warehouseId,
    //   item_name: item_name,
    //   description: description,
    //   category: category,
    //   status: status,
    //   quantity: quantity
    // }
    // for (let i = 0; i < formTextFields.length; i++) {
    //   const key = formTextFields[i];
    //   const value = submittedItem[key];
    //   if (!value || value.length < 3) {
    //     setErrorState({ ...errorState, [key]: value });
    //     console.log(`error with ${key} field`)
    //     alert('Please enter at least 2 characters');
    //     return;
    //   }

    // }
    if (validFormSubmission) {
      const submittedItem = formData;
      let responseData;
      if (requestMethod === 'put') {
        responseData = await apiInstance.put('inventories', id, submittedItem);
      } else {
        responseData = await apiInstance.post('inventories', submittedItem);
      }
      if (typeof responseData === 'object') {
        alert(`${item_name} successfully ${requestMethod === 'put' ? 'edited' : 'added'}`);
        navigate(-1);
      } else {
        const message = `Failed to ${requestMethod === 'put' ? 'edit' : 'add'}: ${responseData}`;
        alert(message);
      }
    }
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setFormData({
      ...formData,
      status: newStatus
    })
  };
  return (
    <section>            
      <form className="form" onSubmit={handleSubmit}>
        <div className='inventory-form__container'>
          <section className="inventory-form__divider inventory-form__divider--left">
            <h2>Item Details</h2>
            <div className="inventory-form__divider-detail">
              <label htmlFor="item_name" className='label-text'>Item Name </label>
              <input
                className="form-input"
                type="text"
                id="item_name"
                name="item_name"
                defaultValue={formData.item_name}
                placeholder="Item Name"
                onChange={handleChange}
              />
            </div>
            <div className="inventory-form__divider-detail">
              <label htmlFor="description" className='label-text'>Description </label>
              <textarea
                className={errorState.description ? `form-input form-input--description ${errorClassName}` : 'form-input form-input--description'}
                id="description"
                name="description"
                defaultValue={formData.description}
                placeholder="Please enter a brief item description..."
                onChange={handleChange}
              />
            </div>
            <div className="inventory-form__divider-detail inventory-form__divider-detail--last">
              <label className='label-text'>Category </label>
              <select
                className={errorState.category ? `form-select ${errorClassName}` : 'form-select'}
                id="category"
                value={formData.category || ""}
                name="category"
                onChange={handleChange}
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
          <section className="inventory-form__divider inventory-form__divider--right">
            <h2>Item Availability</h2>
            <div className="inventory-form__divider-detail">
              <label className='label-text'>Status</label>
              <div className="inventory-form__status">
                <div className="inventory-form__status-check">
                  <input
                    type="radio"
                    className="form-status--instock"
                    id="in_stock"
                    value="In Stock"
                    checked={formData.status === "In Stock"}
                    onChange={handleStatusChange}
                  />
                  <label className="form-status--instock-label" htmlFor="in_stock">
                    In stock
                  </label>
                </div>
               <div className="inventory-form__status-check">
                
                  <input
                    type="radio"
                    className="form-status--outofstock"
                    id="out_of_stock"
                    value="Out of Stock"
                    checked={formData.status === "Out of Stock"}
                    onChange={handleStatusChange}
                  />
                  <label className="item-status__check--outofstock-label" htmlFor="out_of_stock">
                    Out of stock
                  </label>
                </div>
              </div>
            </div>
            {formData.status === 'In Stock' && (
              <div className="inventory-form__divider-detail">
                <label htmlFor="quantity" className='label-text'>Quantity</label>
                <input
                  type="number"
                  className="form-input form-input--quantity"
                  id="quantity"
                  name="quantity"
                  defaultValue={formData.quantity}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="inventory-form__divider-detail inventory-form__divider-detail--last">
              <label className='label-text'>Warehouse</label>
              <select
                className={errorState["warehouse name"] ? `form-select ${errorClassName}` : "form-select"}
                id="warehouse"
                name="warehouse_name"
                defaultValue={formData.warehouse_name}
                onChange={handleChange}
              >
                <option>Please select</option>
                {warehouses.map((warehouse, index) => (
                  <option
                    key={`warehouse-${index}`}
                    value={warehouse}
                    onChange={handleStatusChange}
                  >
                    {warehouse}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </div>
        <div className="button">
          <CancelButton />
          <AddButton buttonText="Save"/>
        </div>
      </form>
    </section>
  );
};

export default EditForm;