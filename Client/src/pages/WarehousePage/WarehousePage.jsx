import React from 'react'; 
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/ApiClient';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
// import './WarehousePage.scss';

function WarehousePage(props) {
  const {
    warehousesArray, totalEdits, setTotalEdits
  } = props;
  return (
    <main>
      <section className="page-top">
        <h1>Warehouses</h1>
      </section>
      <WarehouseList
        warehousesArray={warehousesArray}
        totalEdits={totalEdits}
        setTotalEdits={setTotalEdits}
      />
    </main>
  );
}

export default WarehousePage;