import { useDispatch } from "react-redux";
import { removeCart } from "../features/cart/cartSlice";

const BagCart = ({ item }) => {
  console.log("indisde item", item);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeCart(productId));
  };
  return (
    <div className="m-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
      <div className="relative h-full w-full aspect-square bg-gray-50">
        <img
          src={item.image}
          alt={item.productName}
          className="w-full h-full"
        />

        {item.showDiscount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {item.showDiscount}% OFF
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {item.name}
        </span>

        <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 mb-1">
          {item.productName}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">₹{item.price}</span>

          {item.price?.originalPrize && (
            <span className="text-sm text-gray-400 line-through">
              ₹{item.quantity}
            </span>
          )}
        </div>

        {/* ACTION */}
        <div className="mt-auto">
          {item.length > 0 ? (
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleRemoveFromCart(item.productId)}
              className="w-full border border-red-500 text-red-600 hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors"
            >
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BagCart;
