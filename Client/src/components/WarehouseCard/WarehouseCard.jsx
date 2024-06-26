import React from 'react';

import './WarehouseCard.scss';

const WarehouseCard = ({ warehouseObject }) => {
  const {
    id, warehouse_name, address, city,
    country, contact_name, contact_position,
    contact_phone, contact_email
  } = warehouseObject;

  return (
    <div className="warehouse-card warehouse-card__header-row">
      <div className=" ">
      <div className="warehouse-card__left">
        <h4 className="warehouse-card__heading--table warehouse-card__text-container--name">
          Warehouse
        </h4>
        <h4 className="warehouse-card__heading--table warehouse-card__text-container--address">
          Address
        </h4>
      </div>
      <div className="warehouse-card__right">
        <h4 className="warehouse-card__heading--table warehouse-card__text-container--contact-name">
          Contact Name
        </h4>
        <h4 className="warehouse-card__heading--table warehouse-card__text-container--contact-info">
          Contact Information
        </h4>
      </div>

      </div>
      <div className="warehouse-card__icons">
        <h4 className="warehouse-card__heading--table">
          Actions
        </h4>
      </div>
    </div>
  )
}

export default WarehouseCard
