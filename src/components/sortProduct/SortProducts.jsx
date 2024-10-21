"use client";

import { useContext, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import CategoryRadioBtn from "../buttons/CategoryRadioBtn";
import { ProductContext } from "@/src/context/ProductContext";
import PriceRadioBtn from "../buttons/PriceRadioBtn";

const SortProducts = () => {
  const { categoriesList, setSelectedPriceRange, priceRanges } =
    useContext(ProductContext);
  const [showAll, setShowAll] = useState(false);

  const handleToggleCategories = () => setShowAll((prev) => !prev);

  const displayedCategories = useMemo(
    () => (showAll ? categoriesList : categoriesList.slice(0, 8)),
    [showAll, categoriesList]
  );

  return (
    <div className="w-[250px] md:border-r border-gray-200">
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-5">By Categories</h3>
        <div className="flex flex-col gap-3">
          <CategoryRadioBtn category="All Categories" />
          {displayedCategories.map((category) => (
            <CategoryRadioBtn key={category} category={category} />
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

      <div>
        <h3 className="text-2xl font-semibold mb-5">By Price</h3>
        <div className="flex flex-col gap-3">
          {priceRanges.map((range) => (
            <PriceRadioBtn
              key={range.min}
              range={range}
              onClick={() => setSelectedPriceRange(range)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortProducts;
