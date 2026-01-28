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
        { withCredentials: true }
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
            className="border rounded p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">
                Order ID: {order._id}
              </span>
              <span className="capitalize font-medium">
                {order.status}
              </span>
            </div>

            <ul className="text-sm mb-3">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center">
              <span className="font-semibold">
                ₹{order.totalAmount}
              </span>

              {order.status === "pending" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Cancel
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
