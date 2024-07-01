import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Placeholder from '../../components/Placeholder/Placeholder';
import apiInstance from '../../utils/ApiClient';
import FormHeader from '../../components/FormHeader/FormHeader';
import './ItemDetailsPage.scss';

const ItemDetailsPage = () => {
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
  const {
    id, warehouse_name, item_name, description, category, status, quantity
  } = itemObject;

  return (
    <main>
      <FormHeader
        title="Edit"
        editPath="inventory"
      />
      <article className="item">
        <section className="item__section">
          <h4 className="item__heading">
            Item Description
          </h4>
          <p className="item__p">
            {description}
          </p>
          <h4 className="item__heading">

          </h4>
          <p className="item__p">

          </p>
        </section>
        
      </article>
    </main>

  )
}

export default ItemDetailsPage
