import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { useToast } from "../context/ToastContext";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    audio: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // ดึงข้อมูลสินค้าเดิมมาแสดงในฟอร์มเมื่อหน้าโหลด
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setFormData({
          name: data.name || "",
          price: data.price !== undefined ? data.price : "",
          description: data.description || "",
          image: data.image || "",
          audio: data.audio || "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        showToast("Failed to load product details.", "error");
        navigate("/");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id, apiUrl, navigate, showToast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // เมื่อแก้ไขสำเร็จ แสดง Toast แล้วนำทางกลับไปยังหน้าแสดงรายการสินค้า
      showToast("Product updated successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      showToast("Error updating product.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center my-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <ProductForm
      title={
        <>
          <SquarePen className="w-7 h-7 text-primary" />
          <span>Edit Product</span>
        </>
      }
      buttonText="Save Changes"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={saving}
    />
  );
};

export default EditProduct;
