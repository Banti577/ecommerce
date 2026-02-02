import axios from "axios";
import { useEffect, useState } from "react";

const ViewProducts = () => {
  const [sellerProducts, setSellerProducts] = useState([]);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        console.log("this is the view ", response);
        setSellerProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/my`,
          { withCredentials: true },
        );
        setSellerProducts(res.data || []);
      } catch (err) {
        console.log("fetch error", err);
      }
    };
    fetchMyProducts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Products</h2>

      {sellerProducts.length === 0 ? (
        <p className="text-gray-500">No products created yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sellerProducts.map((p) => (
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

              <div>
                <button
                  className="bg-red-500 p-2 mt-4 cursor-pointer"
                  type="button"
                  onClick={() => handleDeleteProduct(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
