import React from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import PageTop from "../../components/PageTop/PageTop";

function WarehousePage(props) {
  const { warehousesArray, totalEdits, setTotalEdits } = props;
  return (
    <main>
      <section className="page-top-container">
        <h1>Warehouses</h1>
        <PageTop link="/warehouse/add" buttonText="+ Add New Warehouse" />
      </section>
      <WarehouseList
        warehousesArray={warehousesArray}
        totalEdits={totalEdits}
        setTotalEdits={setTotalEdits}
      />
    </main>
  );
}

export default WarehousePage;
