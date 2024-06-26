import React from "react";
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


function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<WarehousePage />} />
      <Route path="/warehouse" element={<WarehousePage />} />
      <Route path="/warehouse/:warehouseId" element={<WarehousePage />} />
      <Route path="/warehouse/:warehouseId/edit" element={<EditWarehousePage />} />
      <Route path="/warehouse/add" element={<AddWarehousePage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/inventory/:itemId" element={<ItemDetailsPage />} />
      <Route path="/inventory/:itemId/edit" element={<EditItemPage />} />
      <Route path="/inventory/add" element={<AddItemPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
