import { useSelector } from "react-redux";
import React, { Suspense } from "react";
import Loader from "./Loader";

const ProductList = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./ProductList")), 2000); // 2 seconds delay
    })
);

const Home = () => {
  const Products = useSelector((state) => state.Products);

  if (Products.isLoading) {
    return <Loader />;
  }

  return (

  <div>
    <Suspense fallback={<Loader />}>
      <ProductList products={Products.products} />
    </Suspense>
    </div>
  );
};

export default Home;