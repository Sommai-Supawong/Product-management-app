import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use environment variable from Vite
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Product Management</h1>
          <button className="btn btn-primary" onClick={() => fetchProducts()}>Refresh</button>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-base-100 rounded-xl shadow">
                <p className="text-lg opacity-70">No products found. Add some to your backend!</p>
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                  {product.image ? (
                    <figure className="h-48 overflow-hidden bg-white">
                      <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                    </figure>
                  ) : (
                    <figure className="h-48 flex items-center justify-center bg-base-300">
                      <span className="opacity-50">No Image</span>
                    </figure>
                  )}
                  <div className="card-body">
                    <h2 className="card-title justify-between">
                      {product.name}
                      <span className="badge badge-secondary">${Number(product.price).toFixed(2)}</span>
                    </h2>
                    <p className="text-sm opacity-80 mt-2">
                      {product.description || "No description provided."}
                    </p>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-sm btn-outline btn-info">Edit</button>
                      <button className="btn btn-sm btn-outline btn-error">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
