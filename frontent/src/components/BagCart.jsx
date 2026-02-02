import { useDispatch } from "react-redux";
import { removeCart } from "../features/cart/cartSlice";

const BagCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeCart(item.productId));
  };

  return (
    <div className="m-2 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden ">
      <div className="relative h-full bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col grow">
        <span className="text-xs text-gray-500 uppercase mb-1">
          {item.brand}
        </span>

        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {item.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          {item.description}
        </p>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold">₹{item.price}</span>

          {item.originalPrice && (
            <span className="text-sm line-through text-gray-400">
              ₹{item.originalPrice}
            </span>
          )}
        </div>

        <p className="text-sm mb-3">
          Quantity: <strong>{item.quantity}</strong>
        </p>

        <button
          onClick={handleRemoveFromCart}
          className="mt-auto border border-red-500 text-red-600 py-2 rounded-lg hover:bg-red-50 cursor-pointer"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default BagCart;
