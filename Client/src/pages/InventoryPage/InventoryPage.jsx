import React from 'react';
import './InventoryPage.scss';
import InventoryList from '../../components/InventoryList/InventoryList';

function InventoryPage() {
  return (
    <main>
      <section className="page-top">
        <h1>Inventory</h1>

      </section>
      <InventoryList />
    </main>
  );
}

export default InventoryPage;