import React from 'react';
import './AddItemPage.scss';
import AddItemForm from '../../components/AddItemForm/AddItemForm'

function AddItemPage() {
  return (
    <main>
        <AddItemForm id={inventoryItemId} />
    </main>
  );
}

export default AddItemPage;