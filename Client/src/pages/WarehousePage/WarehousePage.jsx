import React from 'react'; 
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/ApiClient';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
// import './WarehousePage.scss';

function WarehousePage() {
  return (
    <main>
      <h1>Warehouse Page</h1>
      <WarehouseList />
    </main>
  );
}

export default WarehousePage;