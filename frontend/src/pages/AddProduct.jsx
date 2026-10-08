import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { useToast } from "../context/ToastContext";
import ProductForm from "./ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    audio: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      // แสดง Toast สำเร็จ แล้วนำทางกลับไปยังหน้าแสดงรายการสินค้า
      showToast("Product added successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      showToast("Error adding product. Please check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      title={
        <>
          <CirclePlus className="w-7 h-7 text-primary" />
          <span>Add New Product</span>
        </>
      }
      buttonText="Create Product"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default AddProduct;
