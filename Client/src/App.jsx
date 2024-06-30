import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WarehouseDetailsPage from './pages/WarehouseDetailsPage/WarehouseDetailsPage';
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import ItemDetailsPage from './pages/ItemDetailsPage/ItemDetailsPage';
import EditWarehousePage from './pages/EditWarehousePage/EditWarehousePage';
import EditItemPage from './pages/EditItemPage/EditItemPage';
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage';
import AddItemPage from './pages/AddItemPage/AddItemPage';
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import apiInstance from './utils/ApiClient';
import Placeholder from './components/Placeholder/Placeholder';

function App() {

  const [warehousesArray, setWarehousesArray] = useState(null);
  const [totalEdits, setTotalEdits] = useState(0);

  const getWarehouses = async () => {
    const data = await apiInstance.getItemsArray('warehouses');
    if (data) {
      setWarehousesArray(data);
    }
  }
  
  useEffect(() => {
    getWarehouses();
  }, [totalEdits])

  if (!warehousesArray) {
    return <Placeholder/>
  }

  const warehousesProps = {
    warehousesArray: warehousesArray,
    totalEdits: totalEdits,
    setTotalEdits: setTotalEdits
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<WarehousePage
            warehousesArray={warehousesArray}
            totalEdits={totalEdits}
            setTotalEdits={setTotalEdits}
          />}
        />
        <Route 
          path="/warehouse"
          element={<WarehousePage
            warehousesArray={warehousesArray}
            totalEdits={totalEdits}
            setTotalEdits={setTotalEdits}
          />}
        />
        <Route path="/warehouse/:warehouseId" element={<WarehouseDetailsPage />} />
        <Route path="/warehouse/:warehouseId/edit" element={<EditWarehousePage />} />
        <Route path="/warehouse/add" element={<AddWarehousePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:itemId" element={<ItemDetailsPage />} />
        <Route
          path="/warehouse/:warehouseId/:itemId/edit"
          element={<EditItemPage warehousesProps={warehousesProps} />}
        />
        <Route path="/inventory/:itemId/edit"
          element={<EditItemPage warehousesProps={warehousesProps} />} />
        <Route
          path="/inventory/add"
          element={<AddItemPage warehousesProps={warehousesProps} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
