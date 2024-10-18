"use client";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "@/src/lib/store/features/CartSlice";
import ChangeQuantity from "./ChangeQuantity";

const AddToCartBtn = ({ product }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title.substring(0, 12)}... added to cart`);
  };

  // check item in cart
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };
  return (
    <>
      {isInCart(product.id) ? (
        <ChangeQuantity item={product} />
      ) : (
        <button
          className="w-full bg-gray-200 hover:bg-amazon_blue hover:text-white ease-in-out duration-200 font-bold py-2 px-4 rounded-md"
          onClick={() => addToCartHandler(product)}
        >
          ADD TO CART
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;
