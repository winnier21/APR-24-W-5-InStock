import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InventoryPage.scss';
import InventoryList from '../../components/InventoryList/InventoryList';
import Placeholder from '../../components/Placeholder/Placeholder';
import apiInstance from '../../utils/ApiClient';
import Button from '../../components/Button/Button';
import AddItemPage from '../AddItemPage/AddItemPage';

function InventoryPage() {
  const [inventoryArray, setInventoryArray] = useState(null);
  const navigate = useNavigate();

  const getAllInventory = async () => {
    const data = await apiInstance.getItemsArray('inventories');
    if (data) {
      setInventoryArray(data);
    }
  }

  useEffect(() => {
    getAllInventory();
  }, [inventoryArray])

  const redirectToAddInventory = (event) => {
    console.log('handler clicked')
    navigate(
      '/inventory/add',
      {
        state: {
          inventoryArray: inventoryArray,
          testProp: 'hello'
        }
      }
    );
  }

  if (!inventoryArray) {
    return <Placeholder />
  }

  return (
    <main>
      <section className="page-top">
        <h1>Inventory</h1>
        <Button
          className="button--add"
          text="Add New Item"
          buttonHandler={redirectToAddInventory}
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