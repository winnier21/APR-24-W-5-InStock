import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InventoryList from '../../components/InventoryList/InventoryList';
import WarehouseDetails from '../../components/WarehouseDetails/WarehouseDetails';
import apiInstance from '../../utils/ApiClient';
import Placeholder from '../../components/Placeholder/Placeholder';
// import './WarehouseDetailsPage.scss';

function WarehouseDetailsPage() {
  const warehouseId = useParams().warehouseId;
  const [warehouseObject, setWarehouseObject] = useState(null);

  const getWarehouseDetails = async (warehouseId) => {
    const data = await apiInstance.getItem('warehouses', warehouseId);
    if (data) {
      setWarehouseObject(data);
      console.log('data:', data)
    }
  }

  useEffect(() => {
    getWarehouseDetails(warehouseId);
  }, []);

  if (!warehouseObject) {
    return <Placeholder/>
  }

  return (
    <main>
      <WarehouseDetails warehouseObject={warehouseObject} />
      <InventoryList warehouseId={ warehouseId } />
    </main>
  );
}

export default WarehouseDetailsPage; 