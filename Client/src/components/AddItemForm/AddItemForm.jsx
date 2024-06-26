import React, { useState } from 'react';
import './AddItemForm.scss';
import ArrowBackIcon from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('in_stock');
  const [quantity, setQuantity] = useState(1);
  const [warehouse, setWarehouse] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!itemName ||!description ||!category ||!status ||!warehouse) {
        setErrors({ error: 'All fields are required' });
        return;
      }
    const formData = {
        item_name: itemName,
        description,
        category,
        status,
        quantity: status === 'in_stock' ? quantity : null,
        warehouse_id: warehouse,
    };
    console.log('Form submitted:', {
      itemName,
      description,
      category,
      status,
      quantity,
      warehouse,
    });try {
        const response = await axios.put(`/api/inventories/${id}`, formData); // Update URL and method
        console.log('Item updated successfully:', response.data);
        setItemName('');
        setDescription('');
        setCategory('');
        setStatus('in_stock');
        setQuantity(1);
        setWarehouse('');
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
    
  return (
    <main className="main">            
        <h1 className='main-header'>
            <img src ={ArrowBackIcon} className='arrow-back-icon'/>
            Add New Inventory Item
        </h1>
        <form className = "form" onSubmit={handleSubmit}>

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
                        placeholder="Item Name" 
                        />
                    </div>
                </div>
                <div className="item-detail">
                    <label className='label-text'>Description </label>
                    <div className="item-input">
                        <input
                        className='item-input--description item-input--description-placeholder '
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder ="Please enter a brief item description..." 
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
                        <option value="" placeholder="Please select" >Please select</option>
                        {/* Add category options here */}
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
                <div className="item-warehouse">
                    <label className='label-text'>Warehouse</label>
                    <div className="item-select">
                        <select
                        className="item-select--warehouses"
                        id="warehouse"
                        value={warehouse}
                        onChange={(e) => setWarehouse(e.target.value)}
                        >
                        <option value="">Please select</option>
                        {/* Add warehouse options here */}
                        </select>
                    </div>
                </div>
            </section>
    </form>
    <div className="button">
        <button type="button-cancel" className="button button-cancel">
            Cancel
        </button>
        <button type="button-add" className="button button-add" >
            + Add Item
        </button>
    </div>
</main>
      
  );
};

export default AddItemForm;
