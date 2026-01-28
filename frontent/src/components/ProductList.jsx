import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  console.log('got product is', products);
  return (
    <div className="w-full flex flex-wrap justify-center gap-6 p-6">
      {products.map((item) => {
        return (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <Link to={`/products/${item._id}`} className="block">
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={item.productImg}
                alt={item.productName}
              />
              <div className="p-4">
                <h1 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {item.productName}
                </h1>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.productDesc}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-green-600">
                    Rs.{item.offerPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    Rs.{item.productPrice}
                  </span>
                  <span className="text-sm text-red-500 font-medium">
                    {item.productDiscount}% off
                  </span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
