import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WarehousePage from './pages/WarehousePage/WarehousePage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import AddItemPage from './pages/AddItemPage/AddItemPage';

import './App.scss'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<WarehousePage />} />
      <Route path="/warehouse" element={<WarehousePage />} />
      {/* <Route path="/warehouse/:warehouseId" element={<WarehouseDetailsPage />} /> */}
      {/* <Route path="/warehouse/:warehouseId/edit" element={<EditWarehousePage />} /> */}
      {/* <Route path="/warehouse/add" element={<AddWarehousePage />} /> */}
      <Route path="/inventory" element={<InventoryPage />} />
      {/* <Route path="/inventory/:itemId" element={<ItemDetailsPage />} /> */}
      {/* <Route path="/inventory/:itemId/edit" element={<EditItemPage />} /> */}
      <Route path="/inventory/add" element={<AddItemPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;