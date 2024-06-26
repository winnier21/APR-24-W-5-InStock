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

  // If warehouseId exists, apply a className that allows for wider columns to account for fewer columns.
  let sectionWidth;
  warehouseId ? sectionWidth = "--wide" : sectionWidth = "";
  return (
    <section>
      <InventoryCard itemObject={warehouseId} sectionWidth={sectionWidth}/>
      {
        inventoryArray.map(itemObject => {
          const { id, ...itemData } = itemObject;
          return <InventoryCard
            key={id}
            itemObject={itemData}
            sectionWidth={sectionWidth}
            />
          }
        )
      }
      
    </section>
  )
}

export default InventoryList
