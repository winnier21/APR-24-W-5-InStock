import React from 'react';
import './InventoryCard.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from "../../assets/icons/edit-24px.svg";

const InventoryCard = ({ itemObject }) => {
  if (itemObject === '') {
    return (
      <div className="inventory__card">
        <div className="inventory__details">
        <div className="inventory__left">
          <h4 className="inventory__heading--table">
            Inventory Item
          </h4>
          {/* <h3 className="inventory__item-name">
            {item_name}
          </h3> */}
          <h4 className="inventory__heading--table">
            Category
          </h4>
          {/* <div className="inventory__text-container">
            <p2>
              Gear
            </p2>
          </div> */}
        </div>
        <div className="inventory__right">
          <h4 className="inventory__heading--table">
            Status
          </h4>
          {/* <div className={statusClassName}>
            {status}
          </div>   */}
          <h4 className="inventory__heading--table">
            Qty
          </h4>
          {/* <div className="inventory__text-container">
            <p2>
              {quantity}
            </p2>
          </div> */}
          <h4 className="inventory__heading--table">
            Warehouse
          </h4>
          {/* <div className="inventory__text-container">
            <p2>
              {warehouse_name}
            </p2>
          </div> */}
  
        </div>
  
        </div>
        <div className="inventory__icons">
          {/* <img src={deleteIcon} />
          <img src={editIcon} /> */}
        </div>
      </div>
    )
  }
  
  const { id, warehouse_name, item_name, description, category, status, quantity } = itemObject;
  const statusClassName = status.toLowerCase() === 'in stock' ? 'inventory__status--green' : 'inventory__status--red';
  return (
    <div className="inventory__card">
      <div className="inventory__details">
      <div className="inventory__left">
        <h4 className="inventory__heading">
          Inventory Item
        </h4>
        <h3 className="inventory__item-name">
          {item_name}
        </h3>
        <h4 className="inventory__heading">
          Category
        </h4>
        <div className="inventory__text-container">
          <p2>
            Gear
          </p2>
        </div>
      </div>
      <div className="inventory__right">
        <h4 className="inventory__heading">
          Status
          </h4>
        <div className="inventory__row">
          <div className={statusClassName}>
            {status}
          </div>  
        </div>
        <h4 className="inventory__heading">
          Qty
        </h4>
        <div className="inventory__text-container">
          <p2>
            {quantity}
          </p2>
        </div>
        <h4 className="inventory__heading">
          Warehouse
        </h4>
        <div className="inventory__text-container">
          <p2>
            {warehouse_name}
          </p2>
        </div>

      </div>

      </div>
      <div className="inventory__icons">
        <img src={deleteIcon} />
        <img src={editIcon} />
      </div>
    </div>
  )
}

export default InventoryCard
