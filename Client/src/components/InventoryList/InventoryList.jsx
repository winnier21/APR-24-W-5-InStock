import { useEffect, useState } from 'react';
import React from 'react';
import apiInstance from '../../utils/ApiClient';
import InventoryCard from '../InventoryCard/InventoryCard';
import sortIcon from '../../assets/icons/sort-24px.svg';

const InventoryList = ({warehouseId}) => {
  const [inventoryArray, setInventoryArray] = useState();

  const getAllInventory = async () => {
    let data = null;
    if (! warehouseId) {
      data = await apiInstance.getItemsArray('inventories');
    } else {
      data = await apiInstance.getWarehouseItems(warehouseId);
    }
    if (data) {
      setInventoryArray(data);
    }
  }

  useEffect(() => {
    getAllInventory();
  }, [])

  if (!inventoryArray) {
    return (
      <section>Loading...</section>
    )
  }

  return (
    <section>
      <InventoryCard itemObject={warehouseId} />
      {
        inventoryArray.map(itemObject => {
          const { id, ...itemData } = itemObject;
          return <InventoryCard
              key={id}
              itemObject={itemData}
            />
          }
        )
      }
      
    </section>
  )
}

export default InventoryList
