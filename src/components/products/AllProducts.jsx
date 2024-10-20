"use client";

import Loading from "@/src/app/loading";
import ProductCard from "@/src/components/singleProduct/ProductCard";
import SortProducts from "@/src/components/sortProduct/SortProducts";
import { getFilteredProducts, getProducts } from "@/src/lib/data/apiData";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (selectedCategory === "All Categories") {
          const { products, total } = await getProducts(page, limit);
          setAllProducts(products);
          setTotalProducts(total);
        } else {
          const { products, total } = await getFilteredProducts(
            selectedCategory,
            page,
            limit
          );
          setFilteredProducts(products);
          setTotalProducts(total);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, selectedCategory]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  const products =
    selectedCategory === "All Categories" ? allProducts : filteredProducts;

  return (
    <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 px-3 sm:px-10">
      <div>
        <SortProducts
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
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
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {totalProducts > limit && (
          <Pagination
            page={page}
            limit={limit}
            totalProducts={totalProducts}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
