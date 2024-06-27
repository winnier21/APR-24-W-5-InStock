import React from 'react'; 
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/ApiClient';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
// import './WarehousePage.scss';

function WarehousePage() {
  return (
    <main>
      <section className="page-top">
        <h1>Warehouses</h1>
      </section>
      <WarehouseList />
    </main>
  );
}

export default WarehousePage;