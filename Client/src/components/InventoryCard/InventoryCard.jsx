import React, { useRef } from 'react';
import './InventoryCard.scss';
import ActionIcons from '../ActionIcons/ActionIcons';
import Cardlink from '../CardLink/CardLink';
import Modal from '../../components/Modal/Modal';

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
            <h4 className="inventory__heading--table inventory__text-container inventory__name">
              Inventory Item
            </h4>
            <h4 className=
              "inventory__heading--table inventory__text-container inventory__category"
            >
              Category
            </h4>
          </div>
          <div className={rightSectionClass}>
            <h4 className="inventory__heading--table inventory__text-container--status">
              Status
            </h4>
            <h4 className=
              "inventory__heading--table inventory__text-container inventory__qty"
            >
              Qty
            </h4>
            {createWarehouseHeading(warehouseId)}
          </div>
        </div>
        <div className="inventory__icons">
          <h4 className="inventory__heading--no-scroll">
            Actions
          </h4>
        </div>
      </div>
    )
  }
  
  const { id, warehouse_name, item_name, category, status, quantity } = itemObject;
  const statusClassName = status.toLowerCase() === 'in stock' ? 'inventory__status--green' : 'inventory__status--red';
  

  const createWarehouseElements = (warehouse_name) => {
    if (warehouse_name) {
      return (
        <>
        <h4 className="inventory__heading">
          Warehouse
        </h4>
        <div className="inventory__text-container">
          <p className="table-text">
            {warehouse_name}
          </p>
        </div>
        </>
      )
    } else {
      return '';
    }
  }
  const dialogRef = useRef();
  const modalProps = {
    name: item_name,
    type: 'inventory item',
    dialogRef: dialogRef
  }
  
  return (
    <li className="inventory__card">
      <Modal modalProps={modalProps} />
      <div className="inventory__details">
        <div className={leftSectionClass}>
          <h4 className="inventory__heading">
            Inventory Item
          </h4>
          <Cardlink 
            id={warehouse_name}
            className="inventory__item-name"
            content={item_name}
          />
          <h4 className="inventory__heading">
            Category
          </h4>
          <div className="inventory__text-container">
            <p className="table-text">
              {category}
            </p>
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
          <div className="inventory__text-container inventory__qty">
            <p className="table-text">
              {quantity}
            </p>
          </div>
          {createWarehouseElements(warehouse_name)}

        </div>
      </div>
      <ActionIcons 
        itemId={id}
        dialogRef={dialogRef}
      />
    </li>
  )
}

export default InventoryCard
