import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import ItemDetailsPage from "./pages/ItemDetailsPage/ItemDetailsPage";
import EditWarehousePage from "./pages/EditWarehousePage/EditWarehousePage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import apiInstance from "./utils/ApiClient";
import Placeholder from "./components/Placeholder/Placeholder";
import FormHeader from "./components/FormHeader/FormHeader";

function App() {
  const [warehousesArray, setWarehousesArray] = useState(null);
  const [totalEdits, setTotalEdits] = useState(0);

  const getWarehouses = async () => {
    const data = await apiInstance.getItemsArray("warehouses");
    if (data) {
      setWarehousesArray(data);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, [totalEdits]);

  const warehousesProps = {
    warehousesArray: warehousesArray,
    totalEdits: totalEdits,
    setTotalEdits: setTotalEdits,
  };

  return (
    <BrowserRouter>
      <Header />
      {
        (warehousesArray) ?
          < Routes >
            <Route
              path="/"
              element={
                <WarehousePage
                  warehousesArray={warehousesArray}
                  totalEdits={totalEdits}
                  setTotalEdits={setTotalEdits}
                />
              }
            />
            <Route
              path="/warehouse"
              element={
                <WarehousePage
                  warehousesArray={warehousesArray}
                  totalEdits={totalEdits}
                  setTotalEdits={setTotalEdits}
                />
              }
            />
            <Route
              path="/warehouse/:warehouseId"
              element={<WarehouseDetailsPage />}
            />
            <Route
              path="/warehouse/:warehouseId/edit"
              element={<EditWarehousePage warehousesProps={warehousesProps} />}
            />
            <Route
              path="/warehouse/add"
              element={<AddWarehousePage warehousesProps={warehousesProps} />}
            />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inventory/:itemId" element={<ItemDetailsPage />} />
            <Route
              path="/warehouse/:warehouseId/:itemId/edit"
              element={<EditItemPage warehousesProps={warehousesProps} />}
            />
            <Route
              path="/inventory/:itemId/edit"
              element={<EditItemPage warehousesProps={warehousesProps} />}
            />
            <Route
              path="/inventory/add"
              element={<AddItemPage warehousesProps={warehousesProps} />}
            />
            <Route
              path="*"
              element={<Placeholder text="Page not found. Please use the navigation links above." />}
            />
            <Route
              path="/warehouse/*"
              element={<Placeholder text="Page not found. Please use the navigation links above." />}
            />
            <Route
              path="/inventory/*"
              element={<Placeholder text="Page not found. Please use the navigation links above." />}
            />
          </Routes>
          :
          <main>
            
            <FormHeader
              title="Welcome"
              plain={true}
            />
            <Placeholder />
          </main>
      }
      <Footer />
    </BrowserRouter>
  );
}

export default App;
