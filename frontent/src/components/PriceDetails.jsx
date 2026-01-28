import { useState } from "react";
import axios from "axios";

const PriceDetails = ({ items }) => {

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const itemsCount = items.length;
  const totalOriginalPrice = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const protectFee = 18;
  const totalAmount = totalOriginalPrice + protectFee;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!items.length) return;

    if (
      !address.street ||
      !address.city ||
      !address.zipCode ||
      !address.country
    ) {
      alert("Please fill complete address");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      await axios.post(
        `${backendUrl}/sales/orders`,
        {
          items: items.map((item) => ({
            productId: item.productId,
            name: item.title,
            quantity: item.quantity || 1,
            priceAtPurchase: item.price,
          })),
          totalAmount,
          address,
        },
        { withCredentials: true }
      );

      alert("Order placed successfully");
      setShowAddressForm(false);
    } catch (err) {
      alert("Order failed");
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">PRICE DETAILS</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Price ({itemsCount} items)</span>
          <span>₹{totalOriginalPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Protect Fee</span>
          <span>₹{protectFee}</span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {!showAddressForm ? (
        <button
          disabled={!items.length}
          onClick={() => setShowAddressForm(true)}
          className="w-full mt-4 py-2 bg-pink-600 text-white rounded font-semibold"
        >
          PLACE ORDER
        </button>
      ) : (
        <div className="mt-4 space-y-2">
          <h3 className="font-medium">Delivery Address</h3>

          <input
            name="street"
            placeholder="Street / House No"
            value={address.street}
            onChange={handleAddressChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="zipCode"
            placeholder="Zip Code"
            value={address.zipCode}
            onChange={handleAddressChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleAddressChange}
            className="w-full border px-3 py-2 rounded"
          />

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold"
          >
            CONFIRM ORDER
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceDetails;
