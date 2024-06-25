import React from 'react';
import './InventoryCard.scss';

const InventoryCard = ({ itemObject }) => {
  
  const { id, warehouse_name, item_name, description, category, status, quantity } = itemObject;
  const statusClassName = status.toLowerCase() === 'in stock' ? 'inventory__status--green' : 'inventory__status--red';
  return (
    <div className="inventory__card">
      <div className="inventory__left">
        <h4 className="inventory__header">
          Inventory Item
        </h4>
        <h3 className="inventory__item-name">
          {item_name}
        </h3>
        <h4 className="inventory__header">
          Category
        </h4>
        <p2>
          Gear
        </p2>
      </div>
      <div className="inventory__right">
        <h4 className="inventory__header">
          Status
        </h4>
        <div className={statusClassName}>
          {status}
        </div>  
        <h4 className="inventory__header">
          Qty
        </h4>
        <p2>
          {quantity}
        </p2>

      </div>
      <div className="inventory__icons">

      </div>

    </div>
  )
}

export default InventoryCard
