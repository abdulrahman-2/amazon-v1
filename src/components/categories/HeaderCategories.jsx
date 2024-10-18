"use client";

import Link from "next/link";
import Sidebar from "../common/Sidebar";
import { useEffect, useState } from "react";
import { getCategoriesList } from "@/src/lib/data/apiData";
import { useSession } from "next-auth/react";
import SignOutBtn from "../buttons/SignOutBtn";

const HeaderCategories = () => {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchCategoriesList = async () => {
      const data = await getCategoriesList();
      setCategoriesList(data);
    };
    fetchCategoriesList();
  });

  const { data: session } = useSession();

  return (
    <div>
      <div className="flex items-center gap-4 w-full text-white">
        <div className="hidden md:flex items-center gap-2">
          <Sidebar categoriesList={categoriesList} />
        </div>
        <Link href="/categories" className="headerItem h-full flex-shrink-0">
          All Categories
        </Link>
        {categoriesList.slice(0, 10).map((category) => (
          <Link
            key={category}
            href={`/${category}`}
            className="headerItem h-full flex-shrink-0"
          >
            {category}
          </Link>
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
