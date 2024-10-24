"use client";

import { emptyCart } from "@/src/assets";
import ChangeQuantity from "@/src/components/buttons/ChangeQuantity";
import DeleteFromCart from "@/src/components/buttons/DeleteFromCart";
import ProductsList from "@/src/components/products/ProductsList";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { resetCart } from "@/src/lib/store/features/CartSlice";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const { data: session } = useSession();
  if (!session) {
    redirect("/signIn");
  }

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      const discountedPrice =
        item.price - item.price * (item.discountPercentage / 100);
      total += discountedPrice * item.quantity;
    });
    return total.toFixed(2);
  };

  const calculateSubtotal = (item) => {
    let subTotal = 0;
    const discountedPrice =
      item.price - item.price * (item.discountPercentage / 100);
    subTotal = discountedPrice * item.quantity;
    return subTotal.toFixed(2);
  };

  const createCheckout = async () => {
    if (session?.user) {
      const stripe = await stripePromise;
      try {
        const { data } = await axios.post("/api/checkout", {
          items: cartItems,
          email: session?.user?.email,
        });

        if (data.success) {
          await stripe?.redirectToCheckout({ sessionId: data.id });
        } else {
          toast.error("Failed to create checkout session.");
        }
      } catch (error) {
        console.error("Error in createCheckout:", error);
        toast.error("There was an error with the checkout process.");
      }
    } else {
      toast.error("Please sign in to make Checkout");
    }
  };

  return (
    <div className="h-full w-full bg-gray-200">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen -mt-28">
          <Image
            src={emptyCart}
            alt="empty cart"
            width={300}
            height={300}
            className="w-96 h-96 object-contain"
          />
          <h1 className="text-2xl font-bold -mt-20">Your Cart is Empty</h1>
          <Link href="/" className="text-amazon_blue">
            Return to Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="container mx-auto py-5 flex flex-col-reverse lg:flex-row items-start gap-6 p-3">
            <div className="w-full md:flex-1">
              <div className="bg-white rounded">
                <div className="justify-between p-5 hidden md:flex">
                  <h2 className="font-semibold text-3xl">Shopping Cart</h2>
                  <span className="self-end">Price</span>
                </div>
                <hr className="hidden md:flex" />

                <div className="flex flex-col gap-5 p-5">
                  {cartItems.map((item) => (
                    <div key={item?.id} className="flex gap-3 md:gap-5">
                      <Link href={`/products/${item?.id}`}>
                        <div className="relative bg-gray-200 w-28 h-28 md:w-40 md:h-40 rounded-md">
                          <Image
                            src={item?.images[0]}
                            alt="product image"
                            fill
                            className="absolute object-contain col-span-1"
                          />
                        </div>
                      </Link>
                      <div className="flex-1">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col md:flex-row gap-2 justify-between">
                            <p className="font-semibold text-base md:text-xl">
                              {item?.title}
                            </p>
                            <span className="text-base md:text-xl font-bold">
                              <sup>EGP</sup>
                              {calculateSubtotal(item)}
                            </span>
                          </div>
                          <div className="text-xs text-green-500">
                            {item?.stock >= 5
                              ? "In Stock"
                              : `Only ${item?.stock} Stock`}
                          </div>
                          <p className="text-xs text-gray-600">
                            Eligible for FREE delivery
                          </p>
                          <p className="text-xs font-semibold">
                            Unit Price:{" "}
                            <span className="font-bold">
                              <sup>EGP</sup>
                              {item.price}
                            </span>
                          </p>
                          <p className="text-xs font-semibold">
                            Unit Count:{" "}
                            <span className="font-bold">{item.quantity}</span>
                          </p>
                          <div className="flex items-center gap-3">
                            <ChangeQuantity item={item} />
                            <span className="hidden md:block text-[#007185]/30">
                              |
                            </span>
                            <DeleteFromCart product={item} />
                            <span className="hidden md:block text-[#007185]/30">
                              |
                            </span>
                            <button className="hidden md:block text-[#007185] text-xs font-semibold">
                              Save for Later
                            </button>
                            <span className="hidden md:block text-[#007185]/30">
                              |
                            </span>
                            <button className="hidden md:block text-[#007185] text-xs font-semibold">
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="ml-auto mt-5 block bg-white mb-5 p-2 rounded-lg duration-200 hover:bg-black hover:text-white font-semibold"
                onClick={() => dispatch(resetCart())}
              >
                Reset Cart
              </button>
            </div>

            <div className="w-full md:w-[300px] ml-auto bg-white p-5 rounded">
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-xl">Cart Summary</h2>
                <hr />
                <p className="text-lg">
                  Subtotal ({cartItems.length} items):{" "}
                  <span className="font-bold">
                    <sup>EGP</sup>
                    {calculateTotal(cartItems)}
                  </span>
                </p>
                <button
                  onClick={createCheckout}
                  className="w-full text-center rounded-full bg-amazon_yellowDark text-white py-2 mt-3"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

          <div className="pb-10">
            <ProductsList
              title={
                "Customers who viewed items in your browsing history also viewed"
              }
              linkName={"View More"}
              start={0}
              end={20}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
