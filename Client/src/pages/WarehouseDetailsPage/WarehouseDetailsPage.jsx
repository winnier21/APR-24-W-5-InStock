import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InventoryList from '../../components/InventoryList/InventoryList';
import WarehouseDetails from '../../components/WarehouseDetails/WarehouseDetails';
import apiInstance from '../../utils/ApiClient';
import Placeholder from '../../components/Placeholder/Placeholder';

function WarehouseDetailsPage() {
  const warehouseId = useParams().warehouseId;
  const [warehouseInventory, setWarehouseInventory] = useState(null);
  const [warehouseObject, setWarehouseObject] = useState(null);

  const getWarehouseInventory = async () => {
    const data = await apiInstance.getWarehouseItems(warehouseId);
    if (data) {
      setWarehouseInventory(data);
    }
  }

  const getWarehouseDetails = async (warehouseId) => {
    const data = await apiInstance.getItem('warehouses', warehouseId);
    if (data) {
      setWarehouseObject(data);
    }
  }

  useEffect(() => {
    getWarehouseInventory();
  }, [])

  useEffect(() => {
    getWarehouseDetails(warehouseId);
  }, []);

  if (!warehouseObject || !warehouseInventory) {
    return <Placeholder/>
  }

  return (
    <main>
      <WarehouseDetails warehouseObject={warehouseObject} />
      <InventoryList
        warehouseId={warehouseId}
        inventoryArray={warehouseInventory}
        setInventoryArray={setWarehouseInventory}
      />
    </main>
  );
}

export default WarehouseDetailsPage; 