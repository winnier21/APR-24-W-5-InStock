import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WarehousePage from '../WarehousePage/WarehousePage';
import InventoryPage from '../InventoryPage/InventoryPage';
import './App.css'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<WarehousePage />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;