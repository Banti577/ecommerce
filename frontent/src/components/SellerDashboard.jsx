import { useEffect, useState } from "react";
import axios from "axios";

const SellerDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------- FORM ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock) {
      alert("Name, price and stock are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value),
      );

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      alert("Product added successfully");

      setForm({
        name: "",
        desc: "",
        category: "",
        brand: "",
        price: "",
        discount: "",
        stock: "",
      });

      fetchMyProducts(); // refresh list
    } catch (error) {
      alert(error?.response?.data?.msg || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // ---------- FETCH SELLER PRODUCTS ----------
  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/my`,
        { withCredentials: true },
      );
      setProducts(res.data || []);
    } catch (err) {
      console.log("fetch error", err);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* CREATE PRODUCT */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border space-y-4 max-w-2xl"
      >
        <h2 className="text-xl font-semibold">Add New Product</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Product description"
          className="w-full border px-3 py-2 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border px-3 py-2 rounded"
          />
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount %"
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border px-3 py-2 rounded"
          />
        </div>

        <button
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-4">My Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="border rounded-xl p-4 bg-white shadow-sm"
              >
                <h3 className="font-semibold line-clamp-1">{p.productName}</h3>

                <p className="text-sm text-gray-600 line-clamp-2 my-1">
                  {p.productDesc}
                </p>

                <div className="text-sm mt-2">
                  <span className="font-medium">₹{p.productPrice}</span>
                  <span className="text-gray-400 ml-2">
                    Stock: {p.productStock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
