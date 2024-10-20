"use client";

import { ProductContext } from "@/src/context/ProductContext";
import { useContext } from "react";

const Pagination = () => {
  const { page, handleNextPage, handlePreviousPage, totalProducts, limit } =
    useContext(ProductContext);

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="flex items-center justify-between mt-10">
      <button
        className="py-2 px-4 font-bold rounded-md text-white bg-amazon_yellowDark border-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-600"
        onClick={handlePreviousPage}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        className="py-2 px-4 font-bold rounded-md text-white bg-amazon_yellowDark border-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-600"
        onClick={handleNextPage}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
