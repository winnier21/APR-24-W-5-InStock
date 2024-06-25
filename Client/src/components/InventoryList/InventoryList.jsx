import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import apiInstance from '../../utils/ApiClient';
import InventoryCard from '../InventoryCard/InventoryCard';


const InventoryList = () => {
  const [inventoryArray, setInventoryArray] = useState();
  const warehouseId = useParams().videoId;
  let getInventoryMethod;
  (warehouseId === null) ? getInventoryMethod = apiInstance.getItemsArray : getInventoryMethod = null;

  const getAllInventory = async () => {
    const data = await apiInstance.getItemsArray();
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
      <InventoryCard itemObject="" />
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
