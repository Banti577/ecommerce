import { useDispatch } from "react-redux";
import { removeCart } from "../features/cart/cartSlice";

const BagCart = ({ item }) => {
  console.log('indisde item', item);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeCart(productId));
  };
  return (
    <div className="max-w-wd m-2 overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
      <div className="relative w-full pt-[100%]">
        {
          <img
            src={item.image}
            className="absolute top-0 left-0 w-full object-cover"
            alt={item.productName}
          />
        }

        {item.showDiscount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {item.showDiscount}% Off
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h6 className="text-sm text-gray-500 mb-1 uppercase tracking-wide">
          {item.name}
        </h6>

        <h5 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {item.productName}
        </h5>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
          {item.price.originalPrize && (
            <span className="text-sm text-gray-400 line-through">
              ₹{item.quantity}
            </span>
          )}
        </div>

        <div className="mt-auto">
          {item.length > 0 ? (
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              // onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-50 font-medium py-2 px-4 rounded-md transition-colors duration-200"
              onClick={() => handleRemoveFromCart(item.productId)}
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
