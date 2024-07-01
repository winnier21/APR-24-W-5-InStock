import React from 'react';
import './WarehouseDetails.scss';
import FormHeader from '../FormHeader/FormHeader';

function WarehouseDetails({ warehouseObject }) {
  const {
    id, warehouse_name, address, city, country,
    contact_name, contact_position, contact_phone, contact_email
  } = warehouseObject;

  return (
    <>
      <FormHeader
        title={warehouse_name}
        editPath="warehouse"
      />
      <section className="warehouse-info">
        <div className="warehouse-info__address-div">
          <h4 className="warehouse-info__heading">
            Warehouse Address:
          </h4>
          <p className="table-text">
            {address}, {city}, {country}
          </p>
        </div>
        <div className="warehouse-info__contact-div">
          <div className="warehouse-info__left">
            <h4 className="warehouse-info__heading">
              Contact Name:
            </h4>
            <p className="table-text">
              {contact_name}
            </p>
            <p className="table-text">
              {contact_position}
            </p>
          </div>
          <div className="warehouse-info__right">
            <h4 className="warehouse-info__heading">
              Contact Information:
            </h4>
            <p className="table-text">
              {contact_name}
            </p>
            <p className="table-text">
              {contact_email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default WarehouseDetails;