"use client";

import {
  decreaseQuantity,
  increaseQuantity,
} from "@/src/lib/store/features/CartSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ChangeQuantity = ({ item }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const product = cartItems.find((product) => product.id === item.id);

  const dispatch = useDispatch();

  const handleIncrement = (product) => {
    dispatch(increaseQuantity(product));
    toast.success(`${product.title.substring(0, 12)}... increased quantity`);
  };
  const handleDecrement = (product) => {
    dispatch(decreaseQuantity(product));
    toast.success(`${product.title.substring(0, 12)}... decreased quantity`);
  };
  return (
    <div className="flex items-center gap-5">
      <button
        className="bg-gray-200 w-8 h-8 rounded-full font-bold grid place-items-center"
        onClick={() => handleDecrement(product)}
      >
        -
      </button>
      <span className="font-bold">{product.quantity}</span>
      <button
        className="bg-gray-200 text-black w-8 h-8 rounded-full font-bold grid place-items-center"
        onClick={() => handleIncrement(product)}
      >
        +
      </button>
    </div>
  );
};

export default ChangeQuantity;
