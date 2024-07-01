import React from 'react';
import FormHeader from '../../components/FormHeader/FormHeader';
import EditItemForm from '../../components/EditItemForm/EditItemForm';


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
    </main>
  );
}

export default AddItemPage;