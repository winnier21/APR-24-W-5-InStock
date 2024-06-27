import React from 'react';
import './WarehouseDetails.scss';

function WarehouseDetails({ warehouseObject }) {
  const {
    id, warehouse_name, address, city, country,
    contact_name, contact_position, contact_phone, contact_email
  } = warehouseObject;

  return (
    <>
      <section className="page-top page-top__divider">
        <h1>{warehouse_name}</h1>
      </section>
      <section className="warehouse-info">
        <div className="warehouse-info__address-div">
          <h3 className="warehouse-info__heading">
            Warehouse Address:
          </h3>
          <p className="table-text">
            {address}, {city}, {country}
          </p>
        </div>
        <div className="warehouse-info__contact-div">
          <div className="warehouse-info__left">
            <h3 className="warehouse-info__heading">
              Contact Name:
            </h3>
            <p className="table-text">
              {contact_name}
            </p>
            <p className="table-text">
              {contact_position}
            </p>
          </div>
          <div className="warehouse-info__right">
            <h3 className="warehouse-info__heading">
              Contact Information:
            </h3>
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