import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WarehousePage from './pages/WarehousePage/WarehousePage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
    
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<WarehousePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
      </main>
    <Footer />
    </BrowserRouter>
  );
}

export default App;