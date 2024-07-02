import React, { useRef } from "react";
import "./InventoryCard.scss";
import ActionIcons from "../ActionIcons/ActionIcons";
import Cardlink from "../CardLink/CardLink";
import Modal from "../../components/Modal/Modal";
import StatusTag from "../StatusTag/StatusTag";

const InventoryCard = (props) => {
  const {
    itemObject,
    sectionWidth,
    editPath,
    inventoryArray,
    setInventoryArray,
  } = props;
  const leftSectionClass = `inventory__left${sectionWidth}`;
  const rightSectionClass = `inventory__right${sectionWidth}`;

  /* This code block is used to determine if a column header needs
  to be created for the warehouse name. 
  The total inventory list has a column for the warehouse name. 
  The warehouse-specific inventory list (`WarehouseDetailsPage)
  does not have this column. 
  */
  if (typeof itemObject !== "object") {
    // if it is a string (warehouseId from `InventoryList`) or null
    const isWarehouseSpecific = itemObject;
    // This value is undefined if inventory list is for all inventory

    const createWarehouseHeading = (isWarehouseSpecific) => {
      if (!isWarehouseSpecific) {
        // Create the "warehouse" column if this is the total inventory page
        return <h4 className="inventory__heading--table">Warehouse</h4>;
      } else {
        // Do not create the "warehouse" column if this is for the Warehouse Details page
        return "";
      }
    };
    return (
      <div className="inventory__card inventory__header-row">
        <div className="inventory__details">
          <div className={leftSectionClass}>
            <h4 className="inventory__heading--table inventory__text-container inventory__name">
              Inventory Item
            </h4>
            <h4 className="inventory__heading--table inventory__text-container inventory__category">
              Category
            </h4>
          </div>
          <div className={rightSectionClass}>
            <h4 className="inventory__heading--table inventory__text-container--status">
              Status
            </h4>
            <h4 className="inventory__heading--table inventory__text-container inventory__qty">
              Qty
            </h4>
            {createWarehouseHeading(isWarehouseSpecific)}
          </div>
        </div>
        <div className="inventory__icons">
          <h4 className="inventory__heading--no-scroll">Actions</h4>
        </div>
      </div>
    );
  }

  const { id, warehouse_name, item_name, category, status, quantity } =
    itemObject;
  const statusClassName =
    status.toLowerCase() === "in stock"
      ? "inventory__status--green"
      : "inventory__status--red";

  const createWarehouseElements = (warehouse_name) => {
    if (warehouse_name) {
      return (
        <>
          <h4 className="inventory__heading">Warehouse</h4>
          <div className="inventory__text-container">
            <p className="table-text">{warehouse_name}</p>
          </div>
        </>
      );
    } else {
      return "";
    }
  };
  const dialogRef = useRef();
  const modalProps = {
    name: item_name,
    type: "inventory item",
    dialogRef: dialogRef,
    id: id,
    inventoryArray: inventoryArray,
    setInventoryArray: setInventoryArray,
  };

  return (
    <li className="inventory__card">
      <Modal modalProps={modalProps} />
      <div className="inventory__details">
        <div className={leftSectionClass}>
          <h4 className="inventory__heading">Inventory Item</h4>
          <Cardlink
            id={id}
            className="inventory__item-name"
            content={item_name}
            route="inventory"
          />
          <h4 className="inventory__heading">Category</h4>
          <div className="inventory__text-container">
            <p className="table-text">{category}</p>
          </div>
        </div>
        <div className={rightSectionClass}>
          <h4 className="inventory__heading">Status</h4>
          <div className="inventory__text-container--status">
            <StatusTag status={status} />
          </div>
          <h4 className="inventory__heading">Qty</h4>
          <div className="inventory__text-container inventory__qty">
            <p className="table-text">{quantity}</p>
          </div>
          {createWarehouseElements(warehouse_name)}
        </div>
      </div>
      <ActionIcons itemId={id} dialogRef={dialogRef} editPath={editPath} />
    </li>
  );
};

export default InventoryCard;
