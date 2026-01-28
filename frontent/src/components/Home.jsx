import ProductList from "./ProductList";
import { useSelector } from "react-redux";

const Home = () => {
  const Products = useSelector((state) => state.Products);

  console.log("i got something here", Products);

  if (Products.isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <>
      <ProductList products={Products.products} />
    </>
  );
};

export default Home;
