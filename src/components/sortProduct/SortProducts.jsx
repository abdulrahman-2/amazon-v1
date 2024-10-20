"use client";

import { useContext, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import RadioBtn from "../buttons/RadioBtn";
import { ProductContext } from "@/src/context/ProductContext";

const SortProducts = () => {
  const { categoriesList } = useContext(ProductContext);
  const [showAll, setShowAll] = useState(false);

  // Array of price ranges
  const priceRanges = [
    "All Prices",
    "$0 - $50",
    "$50 - $100",
    "$100 - $150",
    "$150 - $200",
    "Over $200",
  ];

  const handleToggleCategories = () => {
    setShowAll(!showAll);
  };

  // Memoize displayed categories for performance
  const displayedCategories = useMemo(
    () => (showAll ? categoriesList : categoriesList.slice(0, 8)),
    [showAll, categoriesList]
  );

  return (
    <div className="w-[250px] md:border-r border-gray-200">
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-5">By Categories</h3>
        <div className="flex flex-col gap-3">
          <RadioBtn category="All Categories" />
          {displayedCategories.map((category) => (
            <RadioBtn key={category} category={category} />
          ))}
          <button
            className="mt-2 flex items-center gap-2"
            onClick={handleToggleCategories}
          >
            {showAll ? "Show Less" : "See All"}
            <RiArrowDownSLine size={20} />
          </button>
        </div>
      </div>

      {/* Price Sorting Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-5">By Price</h3>
        <div className="flex flex-col gap-3">
          {priceRanges.map((price) => (
            <RadioBtn key={price} category={price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortProducts;
