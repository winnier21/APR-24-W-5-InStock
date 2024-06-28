import React from 'react';
import { useRef } from "react";

import './WarehouseCard.scss';
import ActionIcons from '../ActionIcons/ActionIcons';
import Cardlink from '../CardLink/CardLink';
import Modal from '../../components/Modal/Modal';

const WarehouseCard = ({ warehouseObject }) => {

  if (typeof warehouseObject !== 'object') { // if it is a string or null
    return (
      <div className="warehouse-card warehouse__header-row">
        <div className="warehouse-card__details">
          <div className="warehouse-card__left">
            <h4 className=
              "warehouse-card__heading--table warehouse-card__text-container"
            >
              Warehouse
            </h4>
            <h4 className=
              "warehouse-card__heading--table warehouse-card__text-container warehouse-card__address"
            >
              Address
            </h4>
          </div>
          <div className="warehouse-card__right">
            <h4 className=
              "warehouse-card__heading--table warehouse-card__text-container warehouse-card__contact-name"
            >
              Contact Name
            </h4>
            <h4 className=
              "warehouse-card__heading--table warehouse-card__text-container warehouse-card__contact-info"
            >
              Contact Information
            </h4>
          </div>
        </div>
        <div className="warehouse-card__icons">
          <h4 className="warehouse-card__heading--no-scroll">
            Actions
          </h4>
        </div>
      </div>
    )
  }
  const {
    id, warehouse_name, address, city,
    country, contact_name, contact_position,
    contact_phone, contact_email
  } = warehouseObject;

  const dialogRef = useRef();
  const modalProps = {
    name: warehouse_name,
    type: 'warehouse',
    dialogRef: dialogRef
  }

  return (
    <li className="warehouse-card">
      <Modal modalProps={modalProps} />
      <div className="warehouse-card__details">
        <div className="warehouse-card__left">
          <h4 className="warehouse-card__heading">
            Warehouse
          </h4>
          <Cardlink
            id={id}
            className="warehouse-card__text-container warehouse-card__index"
            content={warehouse_name}
          />
          <h4 className="warehouse-card__heading warehouse-card__address">
            Address
          </h4>
          <div className="warehouse-card__text-container warehouse-card__address">
            <p className="table-text">
              {address}, {city}, {country}
            </p>
          </div>
        </div>
        <div className="warehouse-card__right">
          <h4 className="warehouse-card__heading warehouse-card__contact-name">
            Contact Name
          </h4>
          <div className="warehouse-card__text-container warehouse-card__contact-name">
            <p className="table-text">
              {contact_name}
            </p>  
          </div>
          <h4 className="warehouse-card__heading warehouse-card__contact-name">
            Contact Information
          </h4>
            <div className="warehouse-card__text-container warehouse-card__contact-info">
              <p className="table-text">
                {contact_phone}
              </p>
              <p className="table-text">
                {contact_email}
              </p>
            </div>
          </div>
        </div>
      <ActionIcons 
        warehouseId={id}
        dialogRef={dialogRef}
      />
    </li>
  )
}

export default WarehouseCard;
