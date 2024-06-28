import React from 'react'; 
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/ApiClient';
import Placeholder from '../Placeholder/Placeholder';
import WarehouseCard from '../WarehouseCard/WarehouseCard';

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
      <WarehouseCard itemObject={null} />
      <ul>
      {warehousesArray.map(warehouseObject => {
        const { id } = warehouseObject;
        return <WarehouseCard
          key={id}
          warehouseObject={warehouseObject}
          dialogId="delete-warehouse-modal"
        />
      })}
      </ul >
    </section>
  )
}

export default WarehouseList
