import React from 'react';
import { useParams } from 'react-router-dom';
import InventoryList from '../../components/InventoryList/InventoryList';
import './WarehousePage.scss';

function WarehousePage() {
  const warehouseId = useParams().warehouseId;
  return (
    <main>
      <h1>Warehouse Page</h1>
      <InventoryList warehouseId={ warehouseId } />
    </main>
  );
}

export default WarehousePage;