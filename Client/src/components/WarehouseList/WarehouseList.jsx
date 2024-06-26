import React from 'react'; 
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/ApiClient';
// import './WarehouseList.scss';

const WarehouseList = () => {

  const [warehousesArray, setWarehousesArray] = useState(null);

  if (!inventoryArray) {
    return (
      <section className="api-data-placeholder">Loading...</section>
    )
  }

  const getWarehouses = async () => {
    const data = await apiInstance.getItemsArray('warehouses');
    if (data) {
      setWarehousesArray(data);
    }
  }
  return (
    <section>
      {}
    </section>
  )
}

export default WarehouseList
