import React from 'react';
import './WarehouseDetails.scss';

function WarehouseDetails({ warehouseObject }) {
  const {
    id, warehouse_name, address, city, country,
    contact_name, contact_position, contact_phone, contact_email
  } = warehouseObject;

  return (
    <section className="page-top">
      <h1>{warehouse_name}</h1>
    </section>
  );
}

export default WarehouseDetails;