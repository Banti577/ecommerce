import React, { useState } from "react";
import axios from "axios";
const AddProducts = () => {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      alert(error?.response?.data?.msg || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
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
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
