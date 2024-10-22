"use client";
import { cartIcon } from "@/src/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const CartBtn = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Link
      href="/cart"
      className="text-white lg:headerItem lg:h-[90%] font-semibold flex"
    >
      <Image
        src={cartIcon}
        alt="cart"
        className="w-auto h-6 lg:h-10 object-cover"
      />
      <span className="self-end hidden lg:flex">Cart</span>
      <span className="absolute right-[22px] lg:right-[72px] top-[7px] lg:top-[7px] font-semibold text-amazon_orangeDark">
        {cartItems.length}
      </span>
    </Link>
  );
};

export default CartBtn;
