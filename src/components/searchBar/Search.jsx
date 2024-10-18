"use client";

import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { getCategoriesList } from "@/src/lib/data/apiData";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchCategoriesList = async () => {
      const data = await getCategoriesList();
      setCategoriesList(data);
    };

    fetchCategoriesList();
  });

  return (
    <div className="flex items-center relative">
      <select
        name="categories"
        id="categories"
        className="bg-[#E3E6E6] cursor-pointer h-[38px] p-2 rounded-s-md w-16 text-xs border-[2px] border-transparent outline-none focus-visible:border-amazon_orange"
      >
        <option value="">All</option>
        {categoriesList.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search Amazon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-[38px] w-full p-2 border-[2px] border-transparent outline-none focus-visible:border-amazon_orange"
      />
      {searchQuery && (
        <HiMiniXMark
          size={22}
          className="absolute right-16 cursor-pointer"
          onClick={() => setSearchQuery("")}
        />
      )}
      <div className="bg-amazon_orange hover:bg-amazon_orangeDark cursor-pointer duration-300 h-[38px] py-2 px-4 rounded-e-md">
        <IoSearch size={20} />
      </div>
    </div>
  );
};

export default Search;
