import React from 'react';
import './InventoryCard.scss';
import ActionIcons from '../ActionIcons/ActionIcons';

const InventoryCard = ({ itemObject, sectionWidth }) => {
  const leftSectionClass = `inventory__left${sectionWidth}`;
  const rightSectionClass = `inventory__right${sectionWidth}`

  if (typeof itemObject !== 'object') { // if it is a string or null
    const warehouseId = itemObject;

    const createWarehouseHeading = (warehouseId) => {
      if (!warehouseId) {
        return (
          <h4 className="inventory__heading--table">
            Warehouse
          </h4>
        )
      } else {
        return '';
      }
    }
    return (
      <div className="inventory__card inventory__header-row">
        <div className="inventory__details">
          <div className={leftSectionClass}>
            <h4 className="inventory__heading--table inventory__text-container--name">
              Inventory Item
            </h4>
            <h4 className="inventory__heading--table inventory__text-container--category">
              Category
            </h4>
          </div>
          <div className={rightSectionClass}>
            <h4 className="inventory__heading--table inventory__text-container--status">
              Status
            </h4>
            <h4 className="inventory__heading--table inventory__text-container--qty">
              Qty
            </h4>
            {createWarehouseHeading(warehouseId)}
          </div>
        </div>
        <div className="inventory__icons">
          <h4 className="inventory__heading--table">
            Actions
          </h4>
        </div>
      </div>
    )
  }
  
  const { id, warehouse_name, item_name, description, category, status, quantity } = itemObject;
  const statusClassName = status.toLowerCase() === 'in stock' ? 'inventory__status--green' : 'inventory__status--red';
  

  const createWarehouseElements = (warehouse_name) => {
    if (warehouse_name) {
      return (
        <>
        <h4 className="inventory__heading">
          Warehouse
        </h4>
        <div className="inventory__text-container">
          <p2>
            {warehouse_name}
          </p2>
        </div>
        </>
      )
    } else {
      return '';
    }
  }
  
  return (
    <div className="inventory__card">
      <div className="inventory__details">
      <div className={leftSectionClass}>
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
            {category}
          </p2>
        </div>
      </div>
      <div className={rightSectionClass}>
        <h4 className="inventory__heading">
          Status
          </h4>
        <div className="inventory__text-container--status">
          <div className={statusClassName}>
            {status}
          </div>  
        </div>
        <h4 className="inventory__heading">
          Qty
        </h4>
        <div className="inventory__text-container--qty">
          <p2>
            {quantity}
          </p2>
        </div>
        {createWarehouseElements(warehouse_name)}

      </div>

      </div>
      <ActionIcons />
    </div>
  )
}

export default InventoryCard
