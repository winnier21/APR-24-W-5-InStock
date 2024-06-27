import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '../../assets/icons/arrow_back-24px.svg';
import apiInstance  from '../../utils/ApiClient';
import './AddItemForm.scss';

function AddItemForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "in_stock",
    quantity: 1,
    warehouse: "",
  });
  const [activeField, setActiveField] = useState(null);
  const [errors, setErrors] = useState({});

  //need to get from api data to populate dropdown
  const categories = ['Electronics', 'Apparel', 'Accessories', 'Health', 'Gear'];
  const warehouses = ['Manhattan', 'Washington', 'Jersey', 'SF', 'Santa Monica', 'Seattle', 'Miami', 'Boston'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
     ...formData,
      [name]: value,
    });
    if (value === 'out_of_stock') {
      setFormData({
       ...formData,
        quantity: null,
      });
    }
    validateInput(name, value);
  };
  const handleFocus = (name) => {
    setActiveField(name);
  };

  const handleBlur = (name) => {
    setActiveField(null);
    validateInput(name, formData[name]);
  };

  const validateInput = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  const handleCancel= (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/items");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you ready to submit?")) {
      let valid = true;
      const newErrors = {};

      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          newErrors[key] = "This field is required";
          valid = false;
        } else {
          validateInput(key, formData[key]);
          if (errors[key]) {
            valid = false;
          }
        }
      });

      setErrors(newErrors);

      if (valid) {
        try {
          const response = await apiInstance.postItem(formData);
          console.log('Item updated successfully:', response.data);
          resetForm();
        } catch (error) {
          console.error('Error updating item:', error);
          setErrors({ error: 'Error updating item' });
        }
      }
    }
  };
  const handleStatusChange = (event) => {
    setFormData({...formData, status: event.target.value });
    if (event.target.value === 'out_of_stock') {
      setFormData({...formData, quantity: null });
    }
  };

  const resetForm = () => {
    setFormData({
      item_name: '',
      description: '',
      category: '',
      status: 'in_stock',
      quantity: 1,
      warehouse: '',
    });
    setErrors({});
  };
  return (
    <>            
        <section className='add-item-header'>
             <img src ={ArrowBackIcon} className='arrow-back-icon'/>
            <div className='page-top'>
                <h1>Add New Inventory Item</h1>
            </div>
        </section>
        <section className='add-item-form'>
        <form className = "form" onSubmit={handleSubmit}>
            <div className='form__divider'>
            <section className="item-details">
                
                <div className="item-detail">
                    <h2>Item Details</h2>
                    <label className='label-text'>Item Name </label>
                    <div className="item-input">
                        <input
                        className='item-input--name item-input--name-placeholder'
                        type="text"
                        id="itemName"
                        value={formData.item_name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('item_name')}
                        onBlur={() => handleBlur('item_name')}
                        placeholder="Item Name" 
                        />
                    </div>
                </div>
                <div className="item-detail">
                    <label className='label-text'>Description </label>
                    <div className="item-input">
                        <textarea
                        className='item-input--description item-input--description-placeholder '
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        onFocus={() => handleFocus('description')}
                        onBlur={() => handleBlur('description')}
                        placeholder="Please enter a brief item description..." 
                    />
                    </div>
                </div>
                <div className="item-detail">
                    <label className='label-text'>Category </label>
                    <div className="item-select">   
                        <select
                        className='item-select--category item-select--category-placeholder'
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                            <select
                                className='item-select--status item-select--status-placeholder'
                                id="status"
                                value={formData.status}
                                onChange={handleStatusChange}
                                onFocus={() => handleFocus('status')}
                                onBlur={() => handleBlur('status')}
                            >
                                <option value="in_stock">In Stock</option>
                                <option value="out_of_stock">Out of Stock</option>
                            </select>
                        </div>
                            {/* <input
                                type="radio"
                                className="item-status__check--instock"
                                id="in_stock"
                                value="in_stock"
                                checked={status === 'in_stock'}
                                onChange={() => setStatus('in_stock')}
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
                                value="out_of_stock"
                                checked={status === 'out_of_stock'}
                                onChange={() => setStatus('out_of_stock')}
                            />
                            <label className="item-status__check--outofstock-label" htmlFor="out_of_stock">
                                Out of stock
                            </label> */}
                        {/* </div> */}
                    </div>
                </div>
                {status === 'in_stock' && (
                <div className="item-quantity">
                    <label className='label-text'>Quantity</label>
                    <div className="item-input">
                        <input
                        type="number"
                        className="item-input--quantity"
                        id="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        onFocus={() => handleFocus('quantity')}
                        onBlur={() => handleBlur('quantity')}
                        // onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        />
                    </div>
                </div>
                )}
                <div className="item-warehouse">
                    <label className='label-text'>Warehouse</label>
                    <div className="item-select">
                        <select
                        className="item-select--warehouses"
                        id="warehouse"
                        value={formData.warehouse}
                        onChange={handleChange}
                        onFocus={() => handleFocus('warehouse')}
                        onBlur={() => handleBlur('warehouse')}
                        // onChange={(e) => setWarehouse(e.target.value)}
                    >
                        <option value="">Please select</option>
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
        <div className="form__actions">
            <button type="button" className="button-cancel" onClick={handleCancel}>
                Cancel
            </button>
            <button type="submit" className="button-add" onSubmit={handleSubmit} >
                + Add Item
            </button>
        </div>
    </form>
    </section>
</>
      
  );
};

export default AddItemForm;
