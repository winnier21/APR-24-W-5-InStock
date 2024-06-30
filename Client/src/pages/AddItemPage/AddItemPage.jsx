import React from 'react';
import './AddItemPage.scss';
import AddItem from '../../components/AddItemForm/AddItemForm'

function AddItemPage({ warehousesProps }) {
  const warehouseNamesArray = warehousesProps.warehousesArray.map(object => object.warehouse_name);

  return (
    <main>
        <AddItem warehousesProps={warehousesProps} />
    </main>
  );
}

export default AddItemPage;