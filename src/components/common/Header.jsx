"use client";

import { egyptFlag, logo } from "@/src/assets";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { MdPersonOutline } from "react-icons/md";
import { RiArrowDropRightLine } from "react-icons/ri";
import HeaderCategories from "../categories/HeaderCategories";
import Sidebar from "./Sidebar";
import Search from "../searchBar/Search";
import SignInBtn from "@/src/components/buttons/SignInBtn";
import CartBtn from "../buttons/CartBtn";
import { signIn, useSession } from "next-auth/react";
import { useSelector } from "react-redux";

const Header = () => {
  const { data: session } = useSession();
  const { favoriteItems } = useSelector((state) => state.favorite);
  return (
    <div className="sticky top-0 z-50">
      {/* top header  */}
      <div className="px-3 bg-amazon_blue h-[60px] flex items-center gap-1 md:gap-3">
        <div className="flex md:hidden">
          <Sidebar />
        </div>
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className="w-[90px] lg:w-[120px] object-cover mt-2"
            priority
          />
        </Link>
        <div className="hidden lg:flex items-center headerItem h-[90%] text-xs">
          <HiOutlineLocationMarker size={20} className="text-white" />
          <div className="flex flex-col">
            <span className="text-amazon_lightText font-medium">
              Delivering to New Cairo...
            </span>
            <span className="text-white text-[13px] font-bold">
              Update location
            </span>
          </div>
        </div>
        <div className="hidden lg:block flex-1">
          <Search />
        </div>
        <div className="hidden lg:flex items-center justify-center gap-1 h-[90%] headerItem font-semibold text-white">
          <Image src={egyptFlag} alt="egypt flag" className="w-[20px]" />
          EN
          <RiArrowDropDownFill size={25} />
        </div>
        <div className="hidden lg:flex flex-col justify-end items-start headerItem text-white text-xs font-medium">
          <SignInBtn />
          <div className="flex items-center font-bold">
            <p className="text-[13px]">Accounts & Links</p>
            <RiArrowDropDownFill size={25} />
          </div>
        </div>
        <Link
          href="/favorite"
          className="text-white hidden lg:flex flex-col justify-center h-[90%] headerItem font-semibold"
        >
          <span className="text-amazon_lightText font-medium text-xs flex items-center gap-2">
            Marked{" "}
            <span className="w-5 h-5 border border-amazon_lightText font-bold grid place-items-center text-amazon_orangeDark rounded-md">
              {favoriteItems.length}
            </span>
          </span>
          <span className="text-[13px] font-bold">& Favorite</span>
        </Link>
        <div className="flex items-center ml-auto">
          <div className="lg:hidden flex items-center text-white text-sm">
            {!session && (
              <button onClick={() => signIn()} className="flex items-center">
                sign in
                <RiArrowDropRightLine
                  size={22}
                  className="text-amazon_orangeDark"
                />
              </button>
            )}
            <MdPersonOutline size={35} className="text-white" />
          </div>
          <CartBtn />
        </div>
      </div>
      <div className="px-3 bg-black h-auto lg:hidden block py-2">
        <Search />
      </div>

      {/* bottom header  */}

      <div className="px-3 bg-amazon_light h-[40px] flex items-center hide-scrollbar">
        <HeaderCategories />
      </div>
    </div>
  );
};

export default Header;
