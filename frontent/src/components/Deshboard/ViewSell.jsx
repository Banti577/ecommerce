import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewSell = () => {
  const[orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchUserSell() {
      const sell = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/view-sell`,{
          withCredentials:true
        }
      );

       setOrders(sell.data);
    }
    fetchUserSell();
  }, []);
  return (
    
    <div style={{ padding: "20px" }}>
      <h2>Seller Orders</h2>

      {orders && orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h4>Order ID: {order._id}</h4>

            <p>
              <strong>Customer:</strong> {order.userId.fullName} (
              {order.userId.email})
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.addressToDeliver.street},{" "}
              {order.addressToDeliver.city},{" "}
              {order.addressToDeliver.zipCode},{" "}
              {order.addressToDeliver.country}
            </p>

            <hr />

            <h4>Items</h4>
            {order.items.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p>
                  <strong>Product:</strong>{" "}
                  {item.productId?.productName}
                </p>
                <p>
                  <strong>Price:</strong> ₹
                  {item.productId?.productPrice}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewSell;
