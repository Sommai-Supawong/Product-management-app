import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useToast } from "../context/ToastContext";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";

const ProductPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast("Failed to load products.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    const target = products.find((p) => p.id === id) || { id, name: "Product" };
    setDeleteTarget(target);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        showToast(`Deleted "${deleteTarget.name}" successfully!`, "success");
        setDeleteTarget(null);
        fetchProducts();
      } else {
        showToast("Failed to delete product.", "error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Error connecting to server.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* ส่วนหัวหน้าเว็บ และปุ่ม Add Product ไปยังหน้า /add */}
      <ProductHeader onAddClick={() => navigate("/add")} />

      {/* รายการสินค้า หรือ Loading Spinner */}
      {loading ? (
        <div className="flex justify-center my-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductList
            products={products}
            onEditClick={(product) => navigate(`/edit/${product.id}`)}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {/* DaisyUI Glass Modal: ยืนยันการลบสินค้า */}
      {deleteTarget && (
        <dialog className="modal modal-open backdrop-blur-sm bg-black/30 animate-in fade-in duration-200">
          <div className="modal-box bg-base-100/95 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-3xl p-6 max-w-sm text-center">
            <div className="w-14 h-14 bg-error/10 text-error rounded-2xl flex items-center justify-center mx-auto mb-4 border border-error/20">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-base-content mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-base-content/70 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold text-base-content">
                "{deleteTarget.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="btn btn-ghost rounded-xl text-base-content border border-base-300 px-4"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="btn btn-error rounded-xl text-white shadow-md px-5"
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ProductPage;
