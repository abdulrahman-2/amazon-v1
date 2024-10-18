import ProductCard from "@/src/components/singleProduct/ProductCard";
import { getProducts } from "@/src/lib/data/apiData";

const Categories = async () => {
  const products = await getProducts();
  return (
    <div className="p-3 my-5 md:my-10 container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Categories;
