"use client";

import Link from "next/link";
import Sidebar from "../common/Sidebar";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import SignOutBtn from "../buttons/SignOutBtn";
import { ProductContext } from "@/src/context/ProductContext";
import { useRouter } from "next/navigation";

const HeaderCategories = () => {
  const { categoriesList, selectedCategory, setSelectedCategory } =
    useContext(ProductContext);

  const { data: session } = useSession();

  const router = useRouter();

  const handleSelectedCategory = (category) => {
    selectedCategory === category;
    setSelectedCategory(category);
    router.push(`/products`);
  };

  return (
    <div>
      <div className="flex items-center gap-4 w-full text-white">
        <div className="hidden md:flex items-center gap-2">
          <Sidebar categoriesList={categoriesList} />
        </div>
        <button
          onClick={() => handleSelectedCategory("All Categories")}
          className="headerItem h-full flex-shrink-0 px-3"
        >
          All
        </button>
        {categoriesList.slice(0, 10).map((category) => (
          <button
            onClick={() => handleSelectedCategory(category)}
            key={category}
            className="headerItem h-full flex-shrink-0"
          >
            {category}
          </button>
        ))}
        <Link href="/sell" className="headerItem h-full flex-shrink-0">
          Sell
        </Link>
        <Link href="/help" className="headerItem h-full flex-shrink-0">
          Help
        </Link>
        {session && <SignOutBtn />}
      </div>
    </div>
  );
};

export default HeaderCategories;
