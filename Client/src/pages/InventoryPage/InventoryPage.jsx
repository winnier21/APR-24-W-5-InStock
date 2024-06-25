import React from 'react';
import ItemDetails from '../../components/ItemDetails/ItemDetails';
import './InventoryPage.scss';
import InventoryList from '../../components/InventoryList/InventoryList';

function InventoryPage() {
  return (
    <div>
      <h1>Inventory</h1>
      <InventoryList />
      <ItemDetails />
    </div>
  );
}

export default InventoryPage;