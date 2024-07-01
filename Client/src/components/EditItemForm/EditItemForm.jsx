import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './EditItemForm.scss';
import ArrowBackIcon from '../../assets/icons/arrow_back-24px.svg';
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
    object => object.warehouse_name === warehouse_name
  );
  const [errors, setErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(category || null);
  const [editedItem, setEditItem] = useState(null);
  const [formQuantity, setFormQuantity] = useState(quantity || 0);
  const [selectedStatus, setSelectedStatus] = useState(
    formQuantity > 0 ? 'In Stock' : 'Out of Stock'
  );
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouse_name);
  
  const categories = ['Electronics', 'Apparel', 'Accessories', 'Health', 'Gear'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = event.target.category.value;
    if (!category) {
      alert('Please select a category.');
    }
    const warehouse_name = event.target.warehouse_name.value;
    if (!warehouse_name) {
      alert('Please select a warehouse');
    }
    const quantity = parseInt(event.target.quantity?.value) || 0;
    if (quantity < 1 && selectedStatus === 'In Stock') {
      alert('Please enter a non-zero number.');
    }
    const item_name = event.target.item_name.value;
    const description = event.target.description.value;

    const formTextFields = [
      'item_name', 'description', 'category'
    ]
    const warehouseId = warehousesArray.find(
      warehouseObject => warehouseObject.warehouse_name === warehouse_name
    ).id;
    const submittedItem = {
      warehouse_id: warehouseId,
      item_name: item_name,
      description: description,
      category: category,
      status: selectedStatus,
      quantity: quantity
    }
    for (let i = 0; i < formTextFields.length; i++) {
      const key = formTextFields[i];
      const value = submittedItem[key];
      if (value.length < 3) {
        alert('Please enter at least 2 characters');
        return;
      }

    }
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
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    if (newStatus === 'Out of Stock') {
      setFormQuantity(0);
    } 
  };

  const handleWarehouseChange = (event) => {
    const selectedWarehouse = event.target.value;
    setSelectedWarehouse(selectedWarehouse);
  }

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  }
  return (
    <section>            
      <form className="form" onSubmit={handleSubmit}>
        <div className='forms__container'>
          <section className="item-details">
            <h2>Item Details</h2>
            <div className="item-detail">
              <label className='label-text'>Item Name </label>
              <div className="item-input">
                <input
                  className={`item-input--name form-input ${errors.item_name ? 'error' : ''} `}
                  // className='form-input item-input--name item-input--name-placeholder'
                  type="text"
                  id="item_name"
                  name="item_name"
                  defaultValue={item_name}
                  placeholder="Item Name"
                />
              </div>
            </div>
            <div className="item-input">
              <label className='label-text'>Description </label>
              <div className="item-input">
                <textarea
                  // className='form-input item-input--description item-input--description-placeholder '
                  className={`item-input--description form-input ${errors.description ? 'error' : ''} `}
                  id="description"
                  defaultValue={description}
                  placeholder="Please enter a brief item description..."
                />
              </div>
            </div>
            <div className="item-detail">
              <label className='label-text'>Category </label>
              <div className="item-select">   
                <select
                  // className='form-select item-select--category item-select--category-placeholder'
                  className={`item-select--category form-input ${errors.category? 'error' : ''} `}
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
            </div>
          </section>
          <section className="item-availability">
            <h2>Item Availability</h2>
            <div className="item-availability-status">
              <label className='label-text'>Status</label>
              <div className="item-status">
                <div className="item-status__check">
                  <input
                    type="radio"
                    className="item-status__check--instock"
                    id="in_stock"
                    value="In Stock"
                    checked={selectedStatus === "In Stock"}
                    onChange={handleStatusChange}
                  />
                  <label className="item-status__check--instock-label" htmlFor="in_stock">
                    In stock
                  </label>
                </div>
               <div className="item-status__check">
                  <input
                    type="radio"
                    className="item-status__check--outofstock"
                    id="out_of_stock"
                    value="Out of Stock"
                    checked={selectedStatus === "Out of Stock"}
                    onChange={handleStatusChange}
                  />
                  <label className="item-status__check--outofstock-label" htmlFor="out_of_stock">
                    Out of stock
                  </label>
                </div>
              </div>
            </div>
            {selectedStatus === 'In Stock' && (
              <div className="item-quantity">
                <label className='label-text'>Quantity</label>
                <div className="item-input">
                  <input
                    type="number"
                    // className="form-input item-input--quantity"
                    className={`item-input--quantity form-input ${errors.quantity? 'error' : ''}`}
                    id="quantity"
                    name="quantity"
                    defaultValue={quantity}
                  />
                </div>
              </div>
            )}
            <div className="item-warehouse">
              <label className='label-text'>Warehouse</label>
              <div className="item-select">
                <select
                  // className="form-select item-select--warehouse"
                  className={`item-select--warehouse form-input ${errors.warehouse? 'error' : ''}`}
                  id="warehouse"
                  name="warehouse_name"
                  defaultValue={selectedWarehouse}
                  onChange={handleWarehouseChange}
                >
                  <option>Please select</option>
                  {warehouses.map((warehouse, index) => (
                    <option key={`warehouse-${index}`} value={warehouse}>
                      {warehouse}
                    </option>
                  ))}
                </select>
              </div>
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