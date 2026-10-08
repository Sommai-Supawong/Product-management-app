import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import MainLayout from "./layouts/MainLayout";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* ครอบด้วย MainLayout เพื่อให้ทุกหน้าใช้ธีม Soft Color และ Glass UI เหมือนกัน */}
          <Route element={<MainLayout />}>
            {/* หน้าหลัก: แสดงรายการสินค้า */}
            <Route path="/" element={<ProductPage />} />
            <Route path="/products" element={<Navigate to="/" replace />} />

            {/* หน้าเพิ่มสินค้าใหม่ */}
            <Route path="/add" element={<AddProduct />} />
            <Route path="/products/add" element={<Navigate to="/add" replace />} />

            {/* หน้าแก้ไขสินค้าตาม ID */}
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />

            {/* หน้า 404 เมื่อไม่พบเส้นทางที่ระบุ */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
