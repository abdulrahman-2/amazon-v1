"use client";

import { useRouter } from "next/navigation";
import ProductCard from "../singleProduct/ProductCard";

const SingleCategoryPage = ({ products }) => {
  const router = useRouter();
  const handleNavigate = (id) => {
    router.push(`/products/${id}`);
  };
  return (
    <div>
      {products && products.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {products.map((product) => (
            <div key={product.id} onClick={() => handleNavigate(product.id)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default SingleCategoryPage;
