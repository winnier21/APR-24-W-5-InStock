import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
// import "./InventoryPage.scss";
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
  }, [])

  if (!inventoryArray) {
    return <Placeholder />;
  }

  return (
    <main>
      <section className="page-top-container">
        
          <h1>Inventory</h1>
        <NavLink to='/inventory/add'>
              <PageTop link="/inventory/add" buttonText="+ Add New Item" />
          </NavLink>
      </section>
      <InventoryList
        inventoryArray={inventoryArray}
        setInventoryArray={setInventoryArray}
      />
    </main>
  );
}

export default InventoryPage;
