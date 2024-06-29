import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './EditItemPage.scss';
import EditItemForm from '../../components/EditItemForm/EditItemForm'
import Placeholder from '../../components/Placeholder/Placeholder';
import apiInstance from '../../utils/ApiClient';

const EditItemPage = ({ warehousesProps }) => {
  const itemId = useParams().itemId;
  const [itemObject, setItemObject] = useState(null);

  const getInventoryItem = async () => {
    const data = await apiInstance.getItem('inventories', itemId);
    if (data) {
      setItemObject(data);
    }
  }

  useEffect(() => {
    getInventoryItem();
  }, [])

  if (!itemObject) {
    return <Placeholder />
  }


  return (
    <>
      <EditItemForm
        warehousesProps={warehousesProps}
        itemObject={itemObject}
      />
    </>
  )
}

export default EditItemPage
