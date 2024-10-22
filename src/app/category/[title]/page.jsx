import ProductCard from "@/src/components/singleProduct/ProductCard";
import { getFilteredProducts } from "@/src/lib/data/apiData";

export const generateMetadata = async ({ params }) => {
  const { title } = params;
  return {
    title: `${title} | Amazon Clone App`,
  };
};

const Category = async ({ params }) => {
  const { title } = params;

  // Call getFilteredProducts with the correct argument format
  const { products } = await getFilteredProducts(title, 1, 10);

  return (
    <div className="my-10 container mx-auto p-3">
      <h1 className="text-3xl font-semibold pb-5">{title}</h1>
      <hr />
      {products && products.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default Category;
