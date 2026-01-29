import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/sales/orders`, {
        withCredentials: true,
      });
      setOrders(res.data);
      console.log("order me yah mila", res.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    const ok = window.confirm("Are you sure you want to cancel this order?");
    if (!ok) return;

    try {
      await axios.patch(
        `${backendUrl}/orders/${orderId}/cancel`,
        {},
        { withCredentials: true },
      );
      fetchOrders(); // refresh list
    } catch (err) {
      alert("Order cannot be cancelled");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!orders.length) return <p className="p-4">No orders found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded p-4 bg-white shadow-sm mb-4"
          >
            <div className="flex justify-between text-sm mb-2 border-b pb-2">
              <div>
                <p className="text-gray-500">Order ID: {order._id}</p>
              
                <p className="text-xs text-gray-400">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`capitalize font-semibold ${order.status === "pending" ? "text-orange-500" : "text-green-600"}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mb-3 text-sm">
              <h3 className="font-medium text-gray-700">Delivery Address:</h3>
              <p className="text-gray-600">
                {order.addressToDeliver.street}, {order.addressToDeliver.city} -{" "}
                {order.addressToDeliver.zipCode}
              </p>
            </div>

            {/* Items List */}
            <ul className="text-sm mb-3 space-y-1">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.name || "Product Name"} × {item.quantity || 1}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center border-t pt-2">
              <span className="font-bold text-lg text-blue-600">
                ₹{parseFloat(order.totalAmount).toLocaleString("en-IN")}
              </span>

              {order.status === "pending" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-50 text-red-600 px-3 py-1 rounded text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
