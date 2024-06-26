import React from 'react';

import './WarehouseCard.scss';
import ActionIcons from '../ActionIcons/ActionIcons';

const WarehouseCard = ({ warehouseObject }) => {
  const {
    id, warehouse_name, address, city,
    country, contact_name, contact_position,
    contact_phone, contact_email
  } = warehouseObject;

  if (typeof warehouseObject !== 'object') { // if it is a string or null
    return (
      <div className="warehouse-card warehouse-card__header-row">
        <div className=" ">
          <div className="warehouse-card__left">
            <h4 className="warehouse-card__heading--table warehouse-card__text-container--index">
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

  return (
    <div className="warehouse-card">
      <div className="warehouse-card__details">
        <div className="warehouse-card__left">
          <h4 className="warehouse-card__text-container--index">
            Warehouse
          </h4>
          <h3 className="warehouse-card__warehouse-name">
            {warehouse_name}
          </h3>
          <h4 className="warehouse-card__heading warehouse-card__address">
            Address
          </h4>
          <div className="warehouse-card__text-container warehouse-card__address">
            <p2>
              {address}
            </p2>
          </div>
        </div>
        <div className="warehouse-card__right">
          <h4 className="warehouse-card__heading warehouse-card__contact-name">
            Contact Name
          </h4>
          <div className="warehouse-card__text-container--status">
            <div className="warehouse-card__text-container warehouse-card__contact-name">
              {contact_name}
            </div>  
          </div>
          <h4 className="warehouse-card__heading warehouse-card__contact-name">
            Contact Information
          </h4>
            <div className="warehouse-card__text-container warehouse-card__contact-name">
              <p2>
                {contact_phone}
              </p2>
              <p>
                {contact_email}
              </p>
            </div>
          </div>
        </div>
      <ActionIcons />
    </div>
  )
}

export default WarehouseCard;
