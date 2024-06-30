import React from 'react'; 
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/ApiClient';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
import PageTop from '../../components/PageTop/PageTop';
// import './WarehousePage.scss';

function WarehousePage() {
  return (
    <main>
      <section className="page-top">
        <h1>Warehouses</h1>
        <PageTop />
      </section>
      <WarehouseList />
    </main>
  );
}

export default WarehousePage;