import { useEffect, useState } from 'react';
import InventoryCard from '../InventoryCard/InventoryCard';
import React from 'react';
import apiInstance from '../../utils/ApiClient';


const InventoryList = () => {
  const [inventoryArray, setInventoryArray] = useState([]);

  const getAllInventory = async () => {
    const data = await apiInstance.getItemsArray();
    if (data) {
      setInventoryArray(data);
    }
  }

  useEffect(() => {
    getAllInventory();
  }, [])

  return (
    <section>
      <p>hello</p>
    </section>
  )
}

export default InventoryList
