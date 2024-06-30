import React from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import PageTop from "../../components/PageTop/PageTop";

function WarehousePage() {
  return (
    <main>
      <section className="page-top-container">
        <div className="page-top-wrapper">
          <h1>Warehouses</h1>
          <PageTop link="/warehouse/add" buttonText="+ Add New Warehouse" />
        </div>
      </section>
      <WarehouseList />
    </main>
  );
}

export default WarehousePage;
