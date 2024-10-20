"use client";

import { getCategoriesList } from "@/src/lib/data/apiData";
import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import RadioBtn from "../buttons/RadioBtn";

const SortProducts = ({ selectedCategory, setSelectedCategory }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategoriesList = async () => {
      const data = await getCategoriesList();
      setCategoriesList(data);
    };
    fetchCategoriesList();
  }, []);

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
          <RadioBtn
            category="All Categories"
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {displayedCategories.map((category) => (
            <RadioBtn
              key={category}
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
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
          <RadioBtn category="All Prices" />
          <RadioBtn category="$0 - $50" />
          <RadioBtn category="$50 - $100" />
          <RadioBtn category="$100 - $150" />
          <RadioBtn category="$150 - $200" />
          <RadioBtn category="Over $200" />
        </div>
      </div>
    </div>
  );
};

export default SortProducts;
