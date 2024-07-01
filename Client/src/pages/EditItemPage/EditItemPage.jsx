import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import EditItemForm from '../../components/EditItemForm/EditItemForm'
import Placeholder from '../../components/Placeholder/Placeholder';
import apiInstance from '../../utils/ApiClient';
import FormHeader from '../../components/FormHeader/FormHeader';

const EditItemPage = ({ warehousesProps, itemDetailsObject }) => {
  const itemId = useParams().itemId;
  const [itemObject, setItemObject] = useState(itemDetailsObject);

  const getInventoryItem = async () => {
    const data = await apiInstance.getItem('inventories', itemId);
    if (data) {
      setItemObject(data);
    }
  }

  useEffect(() => {
    if (!itemObject) {
      getInventoryItem();
    }
  }, [])

  if (!itemObject) {
    return <Placeholder />
  }


  return (
    <main className="main-edititem">
      <FormHeader title="Edit Inventory Item" />
      <EditItemForm
        warehousesProps={warehousesProps}
        itemObject={itemObject}
        requestMethod={'put'}
      />
    </main>
  )
}

export default EditItemPage
