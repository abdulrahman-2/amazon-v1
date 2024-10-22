import SingleCategoryPage from "@/src/components/categories/SingleCategoryPage";
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
      <SingleCategoryPage products={products} />
    </div>
  );
};

export default Category;
