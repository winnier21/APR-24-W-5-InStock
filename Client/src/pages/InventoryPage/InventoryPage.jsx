import React from 'react';
import './InventoryPage.scss';
import InventoryList from '../../components/InventoryList/InventoryList';

function InventoryPage() {
  return (
    <main>
      <h1>Inventory</h1>
      <InventoryList />
    </main>
  );
}

export default InventoryPage;