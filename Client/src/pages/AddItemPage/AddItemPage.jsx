import React from 'react';
import './AddItemPage.scss';
import AddItem from '../../components/AddItemForm/AddItemForm'

function AddItemPage({ inventoryArray, testProp }) {
  console.log('inventoryArray:', inventoryArray)
  console.log('test prop', testProp)
  return (
    <main>
        <AddItem/>
    </main>
  );
}

export default AddItemPage;