import Loader from "./Loader";
import ProductList from "./ProductList";
import { useSelector } from "react-redux";

const Home = () => {
  const Products = useSelector((state) => state.Products);

    if (Products.isLoading) {
    return <Loader/>
  }

  return (
    <>
      <ProductList products={Products.products} />
    </>
  );
};

export default Home;
