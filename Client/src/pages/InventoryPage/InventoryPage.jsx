import React, { useEffect, useState } from "react";
import "./InventoryPage.scss";
import InventoryList from "../../components/InventoryList/InventoryList";
import Placeholder from "../../components/Placeholder/Placeholder";
import apiInstance from "../../utils/ApiClient";
import PageTop from "../../components/PageTop/PageTop";

function InventoryPage() {
  const [inventoryArray, setInventoryArray] = useState(null);

  const getAllInventory = async () => {
    const data = await apiInstance.getItemsArray("inventories");
    if (data) {
      setInventoryArray(data);
    }
  };

  useEffect(() => {
    getAllInventory();
  }, [inventoryArray]);

  if (!inventoryArray) {
    return <Placeholder />;
  }

  return (
    <main>
      <section className="page-top-container">
        <div className="page-top-wrapper">
          <h1>Inventory</h1>
          <PageTop link="/inventory/add" buttonText="+ Add New Item" />
        </div>
      </section>
      <InventoryList
        inventoryArray={inventoryArray}
        setInventoryArray={setInventoryArray}
      />
    </main>
  );
}

export default InventoryPage;
