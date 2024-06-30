import React from 'react';
import './AddItemPage.scss';
// import AddItem from '../../components/AddItemForm/AddItemForm'
// import AddItemForm2 from '../../components/AddItemForm/AddItemForm2';
import EditItemForm from '../../components/EditItemForm/EditItemForm';
import FormHeader from '../../components/FormHeader/FormHeader';

function AddItemPage({ warehousesProps }) {
  const itemObject = {
    id: null,
    warehouse_name: null,
    item_name: null,
    description: null,
    category: null,
    status: null,
    quantity: 0
  }

  return (
    <main>
      <FormHeader title="Add New Inventory Item" />
      <EditItemForm
        warehousesProps={warehousesProps}
        itemObject={itemObject}
      />
      {/* <AddItemForm2 warehousesProps={warehousesProps} /> */}
      {/* <AddItem warehousesProps={warehousesProps} /> */}
    </main>
  );
}

export default AddItemPage;