import { useState } from "react";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PriceDetails = ({ items }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const user = useSelector((store) => store.Auth.user);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const itemsCount = items.length;
  const totalOriginalPrice = items.reduce((sum, item) => sum + item.price, 0);

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

    const streetRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    const cityRegex = /^[a-zA-Z\s.-]{2,}$/;
    const zipRegex = /^\d{5}(-\d{4})?$/;
    const countryRegex = /^[a-zA-Z\s]{2,}$/;

    if (
      !address.street ||
      !streetRegex.test(address.street.trim()) ||
      !address.city ||
      !cityRegex.test(address.city.trim()) ||
      !address.zipCode ||
      !zipRegex.test(address.zipCode.toString().trim()) ||
      !address.country ||
      !countryRegex.test(address.country.trim())
    ) {
      alert("Please fill in a valid, complete address.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      await axios.post(
        `${backendUrl}/sales/orders`,
        {
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity || 1,
            priceAtPurchase: item.price,
          })),
          totalAmount,
          address,
        },
        { withCredentials: true },
      );

      alert("Order placed successfully");
      setShowAddressForm(false);
    } catch (err) {
      console.log(err);
      alert(`Order failed", ${err.response.data.msg}`);
    }
  };

  return (
    <div className={` bg-white p-4 rounded-lg shadow-md w-full max-w-sm`}>
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
          onClick={() => {
            if (!user) {
              alert("Please login to place an order");
              navigate("/auth");
              return;
            }
            setShowAddressForm(true);
          }}
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
