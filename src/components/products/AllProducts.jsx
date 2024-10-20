"use client";

import Loading from "@/src/app/loading";
import ProductCard from "@/src/components/singleProduct/ProductCard";
import SortProducts from "@/src/components/sortProduct/SortProducts";
import Pagination from "../pagination/Pagination";
import { useContext } from "react";
import { ProductContext } from "@/src/context/ProductContext";

const AllProducts = () => {
  const { products, loading, error, limit, totalProducts } =
    useContext(ProductContext);

  return (
    <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 px-3 sm:px-10">
      <div>
        <SortProducts />
      </div>

      <div className="flex-1">
        <div>
          <h1 className="text-2xl font-semibold">
            {`Results (${totalProducts}) products`}
          </h1>
          <p className="text-gray-600 mb-4">
            Check each product page for other buying options.
          </p>
        </div>

        {loading ? (
          <div className="-mt-[200px]">
            <Loading />
          </div>
        ) : error ? (
          <div className="text-red-500 text-lg">
            {`Failed to load products: ${error.message}`}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {totalProducts > limit && <Pagination />}
      </div>
    </div>
  );
};

export default AllProducts;
