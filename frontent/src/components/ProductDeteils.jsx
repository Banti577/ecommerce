import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addTOCart } from "../features/cart/cartSlice";
import Loader from "./Loader";
import { useTheme } from "../contexts/ThemeContext";

const ProductDetails = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const Products = useSelector((state) => state.Products);
  console.log("i got something here", Products);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      productId: product._id,
      name: product.productName,
      description: product.productDesc,
      price: product.offerPrice,
      originalPrice: product.productPrice,
      discount: product.productDiscount,
      image: product.productImg,
      brand: product.productBrand,
      category: product.productCategory,
      attributes: product.attributes,
      quantity: 1,
      stock: product.productStock,
    };
    dispatch(addTOCart(cartItem));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = Products.products.find((item) => item._id == id);
        setProduct(foundProduct);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, Products.products]);

  if (loading) return <Loader />;

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray">
        Product not found
      </div>
    );

  return (
    <div className="p-4">
    <div className={`${theme.curr_BG} ${theme.curr_TEXT} transition-all duration-300  py-10`}>
      <div
        className={`${theme.curr_BG} transition-all duration-300
        max-w-6xl mx-auto p-4 sm:p-6 rounded-xl shadow-lg`}
      >
        <div className="flex flex-col md:flex-row gap-8">
        
          <div className="md:w-1/2">
            <img
              src={product.productImg}
              alt={product.productName}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-3">{product.productName}</h1>

            <p className="text-base opacity-80 mb-4">{product.productDesc}</p>

            <p className="text-sm mb-4">
              Brand:
              <span className="font-semibold ml-1">{product.productBrand}</span>
            </p>

    
            <div className="mb-6">
              <span className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                ₹{product.offerPrice}
              </span>

              <span className="line-through opacity-60 ml-3 text-lg">
                ₹{product.productPrice}
              </span>

              <span className="text-pink-600 dark:text-pink-400 ml-3 text-lg">
                {product.productDiscount}% OFF
              </span>

              <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                inclusive of all taxes
              </p>
            </div>

            <div
              className={`${theme.curr_BG} border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6`}
            >
              <p className="text-sm opacity-80 mb-1">
                Color:
                <span className="font-medium ml-1">
                  {product.attributes?.color}
                </span>
              </p>
              <p className="text-sm opacity-80 mb-1">
                Size:
                <span className="font-medium ml-1">
                  {product.attributes?.size}
                </span>
              </p>
              <p className="text-sm opacity-80 mb-1">
                Weight:
                <span className="font-medium ml-1">
                  {product.attributes?.weight}
                </span>
              </p>
              <p className="text-sm opacity-80">
                Dimensions:
                <span className="font-medium ml-1">
                  {product.attributes?.dimensions}
                </span>
              </p>
            </div>

            <p className="mb-6 text-base">
              Stock Available:
              <span className="font-semibold ml-1">{product.productStock}</span>
            </p>

            <button
              onClick={handleAddToCart}
              disabled={product.productStock === 0}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${
                product.productStock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
            >
              {product.productStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
