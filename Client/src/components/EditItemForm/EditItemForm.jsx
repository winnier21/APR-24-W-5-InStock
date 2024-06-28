import React, { useState } from 'react';
import './EditItemForm.scss';
import ArrowBackIcon from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';
import AddButton from '../Button/AddButton/AddButton';
import CancelButton from '../Button/CancelButton/CancelButton';

const EditForm = ({ id, itemId }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [warehouse, setWarehouse] = useState('Manhattan'); 
  const [status, setStatus] = useState('in_stock');
  const [quantity, setQuantity] = useState(1);
  const [warehouseId, setWarehouseId] = useState(''); // assuming warehouse ID is 1
  const [errors, setErrors] = useState({});
  const categories = ['Electronics', 'Apparel', 'Accessories', 'Health', 'Gear'];
  const warehouses = ['Manhattan', 'Washington', 'Jersey', 'SF', 'Santa Monica', 'Seattle', 'Miami', 'Boston'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!itemName ||!description ||!category ||!status ||!warehouseId) {
      setErrors({ error: 'All fields are required' });
      return;
    }
    const formData = {
      warehouse_id: warehouseId,
      item_name: itemName,
      description,
      category,
      status,
      quantity: status === 'in_stock' ? quantity : null,
    };
    try {
      const response = await axios.put(`/inventories/${itemId}`, formData);
      console.log('Item updated successfully:', response.data);
      resetForm();
    } catch (error) {
      console.error('Error updating item:', error);
      setErrors({ error: 'Error updating item' });
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    if (event.target.value === 'out_of_stock') {
      setQuantity(null);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setItemName('');
    setDescription('');
    setCategory('');
    setStatus('in_stock');
    setQuantity(1);
    setWarehouseId(1);
    setErrors({});
  };

  return (
    <main className="main-edititem">            
      <h1 className='main-header'>
        <img src={ArrowBackIcon} className='arrow-back-icon'/>
        Edit Inventory Item
      </h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className='form__divider'>
          <section className="item-details">
            <h2>Item Details</h2>
            <div className="item-detail">
              <label className='label-text'>Item Name </label>
              <div className="item-input">
                <input
                  className='item-input--name item-input--name-placeholder'
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Television" 
                />
              </div>
            </div>
            <div className="item-detail">
              <label className='label-text'>Description </label>
              <div className="item-input">
                <textarea
                  className='item-input--description item-input--description-placeholder '
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.'
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
                  <input
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
                  </label>
                </div>
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
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
                  value={warehouseId}
                  onChange={(e) => setWarehouseId(e.target.value)}
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
        <div className="button">
            <CancelButton onClick={handleCancel} />
            <AddButton buttonText="Save"onClick={handleSubmit} />
        </div>
      </form>
    </main>
  );
};

export default EditForm;