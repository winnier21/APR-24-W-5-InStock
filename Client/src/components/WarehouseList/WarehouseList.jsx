import React from 'react'; 
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/ApiClient';
import Placeholder from '../Placeholder/Placeholder';
import WarehouseCard from '../WarehouseCard/WarehouseCard';
// import './WarehouseList.scss';

const WarehouseList = () => {

  const [warehousesArray, setWarehousesArray] = useState(null);

  const getWarehouses = async () => {
    const data = await apiInstance.getItemsArray('warehouses');
    if (data) {
      setWarehousesArray(data);
    }
  }
  
  useEffect(() => {
    getWarehouses();
  }, [])

  if (!warehousesArray) {
    return <Placeholder />
  }

  return (
    <section>
      <ul>
      {warehousesArray.map(warehouseObject => {
        const { id, ...warehouseData } = warehouseObject;
        return <WarehouseCard
          key={id}
          warehouseObject={warehouseData}
        />
      })}
      </ul >
    </section>
  )
}

export default WarehouseList
