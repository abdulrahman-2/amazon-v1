"use client";

import { verified } from "@/src/assets";
import { resetCart } from "@/src/lib/store/features/CartSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Success({ searchParams }) {
  const dispatch = useDispatch();

  useEffect(() => {
    !searchParams?.session_id ? redirect("/") : dispatch(resetCart());
  }, [dispatch, searchParams?.session_id]);
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-[110px] px-5">
      <Image src={verified} alt="check" width={200} height={200} />
      <h2 className="text-3xl font-semibold">Payment Successful !</h2>
      <h2 className="text-lg font-semibold text-center mt-6 text-gray-500">
        We sent an email with your order confirmation along with Digital Content
      </h2>
      <Link href="/" className="py-2 px-5 mt-6 text-white rounded-md bg-black">
        Go to Home
      </Link>
    </div>
  );
}

export default Success;
