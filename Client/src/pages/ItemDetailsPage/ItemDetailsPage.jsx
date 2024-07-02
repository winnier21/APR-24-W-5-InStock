import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Placeholder from "../../components/Placeholder/Placeholder";
import apiInstance from "../../utils/ApiClient";
import FormHeader from "../../components/FormHeader/FormHeader";
import "./ItemDetailsPage.scss";
import StatusTag from "../../components/StatusTag/StatusTag";

const ItemDetailsPage = () => {
  const itemId = useParams().itemId;
  const [itemObject, setItemObject] = useState(null);

  const getInventoryItem = async () => {
    const data = await apiInstance.getItem("inventories", itemId);
    if (data) {
      setItemObject(data);
    }
  };

  useEffect(() => {
    getInventoryItem();
  }, []);

  if (!itemObject) {
    return <Placeholder />;
  }
  const { id, warehouse_name, item_name, description, category, quantity } =
    itemObject;
  let status;
  if (quantity > 0) {
    status = "In Stock";
  } else {
    status = "Out of Stock";
  }

  return (
    <main>
      <FormHeader title={item_name} editPath="inventory" />
      <article className="item">
        <section className="item__section item__section--left">
          <h4 className="item__heading">Item Description:</h4>
          <p className="item__p">{description}</p>
          <h4 className="item__heading">Category:</h4>
          <p className="item__p">{category}</p>
        </section>
        <section className="item__section item__section--right">
          <div className="item__subsection">
            <div className="item__property-div">
              <h4 className="item__heading">Status:</h4>
              <StatusTag status={status} />
            </div>
            <div className="item__property-div">
              <h4 className="item__heading">Quantity</h4>
              <p className="item__p">{quantity}</p>
            </div>
          </div>
          <h4 className="item__heading">Warehouse:</h4>
          <p className="item__p">{warehouse_name}</p>
        </section>
      </article>
    </main>
  );
};

export default ItemDetailsPage;
