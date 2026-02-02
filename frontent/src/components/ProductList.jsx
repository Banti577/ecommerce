import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

const ProductList = ({ products }) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const rawCategories = products.map((p) => p.productCategory);

  const uniqueCategories = rawCategories.filter(
    (category, index, array) => array.indexOf(category) === index,
  );

  const categories = ["all", ...uniqueCategories];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.productCategory === selectedCategory);

  return (
    <>
    <div>
      <div className="flex justify-end px-6 p-2 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm outline-none cursor-pointer "
        >
          {categories.map((item) => (
            <option className="cursor-pointer" key={item} value={item} >
              {item.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-6 p-1">
        {filteredProducts.map((item) => (
          <div
            key={item._id}
            className={`${theme.curr_BG} ${theme.curr_TEXT}
            w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/5
            rounded-xl border border-gray-200
            shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}
          >
            <Link to={`/products/${item._id}`} className="block">
              <img
                className="w-full h-48 object-cover"
                src={item.productImg}
                alt={item.productName}
              />

              <div className="p-4">
                <h1 className="text-base font-semibold truncate mb-1">
                  {item.productName}
                </h1>

                <p className="text-sm opacity-80 line-clamp-2 mb-3">
                  {item.productDesc}
                </p>

                <p className="text-xs font-medium opacity-60 mb-2">
                  Category: {item.category}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    ₹{item.offerPrice}
                  </span>

                  <span className="text-sm opacity-60 line-through">
                    ₹{item.productPrice}
                  </span>

                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {item.productDiscount}% off
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default ProductList;
