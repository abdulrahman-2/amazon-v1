"use client";

import { ProductContext } from "@/src/context/ProductContext";
import { useContext } from "react";

const PriceRadioBtn = ({ range, onClick }) => {
  const { selectedPriceRange } = useContext(ProductContext);

  return (
    <div className="flex items-center gap-5 relative">
      <input
        value={range.label}
        checked={selectedPriceRange.label === range.label}
        onChange={onClick}
        type="radio"
        id={range.label}
        name="price"
        className="appearance-none h-6 w-6 border-2 border-gray-200 rounded-full checked:bg-[#fa8900] focus:outline-none transition duration-200 peer cursor-pointer shadow-md hover:shadow-lg"
      />
      <span className="absolute h-3 w-3 rounded-full bg-white left-[12px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
      <label
        htmlFor={range.label}
        className="cursor-pointer text-base font-medium text-gray-600 hover:text-[#fa8900] transition duration-200"
      >
        {range.label}
      </label>
    </div>
  );
};

export default PriceRadioBtn;
