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
      className="text-white md:headerItem md:h-[90%] font-semibold flex"
    >
      <Image
        src={cartIcon}
        alt="cart"
        className="w-auto h-6 md:h-10 object-cover"
      />
      <span className="self-end hidden md:flex">Cart</span>
      <span className="absolute right-[24px] md:right-[72px] top-[7px] md:top-[7px] font-semibold text-amazon_orangeDark">
        {cartItems.length}
      </span>
    </Link>
  );
};

export default CartBtn;
