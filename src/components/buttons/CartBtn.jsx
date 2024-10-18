"use client";
import { cartIcon } from "@/src/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const CartBtn = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Link href="/cart" className="text-white md:headerItem font-semibold flex">
      <Image
        src={cartIcon}
        alt="cart"
        className="w-auto h-8 md:h-11 object-cover"
      />
      <span className="self-end hidden md:flex">Cart</span>
      <span className="absolute right-[22px] md:right-[67px] top-[22px] md:top-[20px] text-xs md:text-sm text-amazon_orangeDark">
        {cartItems.length}
      </span>
    </Link>
  );
};

export default CartBtn;
