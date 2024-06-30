import React, { useEffect, useState } from 'react';
import './InventoryPage.scss';
import InventoryList from '../../components/InventoryList/InventoryList';
import Placeholder from '../../components/Placeholder/Placeholder';
import apiInstance from '../../utils/ApiClient';
import Button from '../../components/Button/Button';

function InventoryPage() {
  const [inventoryArray, setInventoryArray] = useState(null);

  const getAllInventory = async () => {
    const data = await apiInstance.getItemsArray('inventories');
    if (data) {
      setInventoryArray(data);
    }
  }

  useEffect(() => {
    getAllInventory();
  }, [inventoryArray])

  if (!inventoryArray) {
    return <Placeholder />
  }

  return (
    <main>
      <section className="page-top">
        <h1>Inventory</h1>
        <Button
          className="button--add"
          
        />
      </section>
      <InventoryList
        inventoryArray={inventoryArray}
        setInventoryArray={setInventoryArray}
      />
    </main>
  );
}

export default InventoryPage;