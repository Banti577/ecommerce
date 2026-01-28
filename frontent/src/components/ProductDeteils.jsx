import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addTOCart } from "../features/cart/cartSlice";
import Loader from "./Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
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
      <div className="flex items-center justify-center h-screen text-xl text-gray-600">
        Product not found
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto my-10 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.productImg}
            alt={product.productName}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-1/2 p-4">
          <h1 className="font-bold text-4xl mb-3 text-gray-800">
            {product.productName}
          </h1>
          <p className="text-lg text-gray-500 mb-4">{product.productDesc}</p>

          <p className="mb-4 text-sm text-gray-600">
            Brand:{" "}
            <span className="font-semibold text-gray-800">
              {product.productBrand}
            </span>
          </p>

          <div className="mb-6">
            <span className="text-4xl font-extrabold text-gray-900">
              Rs. {product.offerPrice}
            </span>
            <span className="line-through text-gray-400 ml-3 text-xl">
              Rs. {product.productPrice}
            </span>
            <span className="text-pink-600 ml-3 text-lg">
              {product.productDiscount}% OFF
            </span>
            <p className="text-green-600 text-sm mt-1">
              inclusive of all taxes
            </p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-1">
              Color:
              <span className="font-medium">{product.attributes?.color}</span>
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Size:
              <span className="font-medium">{product.attributes?.size}</span>
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Weight:
              <span className="font-medium">{product.attributes?.weight}</span>
            </p>
            <p className="text-sm text-gray-700">
              Dimensions:
              <span className="font-medium">
                {product.attributes?.dimensions}
              </span>
            </p>
          </div>

          <p className="mb-6 text-base">
            Stock Available:
            <span className="font-semibold text-gray-800">
              {product.productStock}
            </span>
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.productStock === 0}
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold shadow-md transition duration-300 ease-in-out ${
              product.productStock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 transform hover:scale-105"
            }`}
          >
            {product.productStock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
