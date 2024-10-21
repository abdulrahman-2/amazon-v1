"use client";

import { useSelector } from "react-redux";
import ProductCard from "../singleProduct/ProductCard";
import ProductsList from "../products/ProductsList";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { emptyWishlist } from "@/src/assets";

const FavoritePage = () => {
  const { favoriteItems } = useSelector((state) => state.favorite);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      {favoriteItems.length > 0 ? (
        <>
          <div className="container mx-auto p-3 mt-10">
            <div className="bg-gray-100 p-5 rounded-lg relative">
              <h3 className="text-3xl font-semibold pb-5">{`Favorite List (${favoriteItems.length})`}</h3>
              <hr />
              <div className="mt-5">
                <Swiper
                  spaceBetween={10}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  breakpoints={{
                    0: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 5 },
                    1536: { slidesPerView: 6 },
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {favoriteItems.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="navigateBtn">
                <button
                  ref={prevRef}
                  className="absolute w-10 md:w-16 flex items-center justify-center shadow-md z-20 top-1/2 translate-y-[-50%] left-0 h-20 md:h-24 text-black/50 bg-white/60 rounded-e-lg"
                >
                  <MdArrowBackIos size={30} />
                </button>
                <button
                  ref={nextRef}
                  className="absolute w-10 md:w-16 flex items-center justify-center shadow-md z-20 top-1/2 translate-y-[-50%] right-0 h-20 md:h-24 text-black/50 bg-white/60 rounded-s-lg"
                >
                  <MdArrowForwardIos size={30} />
                </button>
              </div>
            </div>
          </div>
          <div className="my-10">
            <ProductsList
              title={
                "Customers who viewed items in your browsing history also viewed"
              }
              linkName={"View More"}
              start={50}
              end={80}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen -mt-28">
          <Image
            src={emptyWishlist}
            alt="empty wishlist"
            width={300}
            height={300}
            className="w-96 h-96 object-contain"
          />
          <h1 className="text-2xl font-bold -mt-20">Your Favorites is Empty</h1>
          <Link href="/" className="text-amazon_blue">
            Return to Shopping
          </Link>
        </div>
      )}
    </>
  );
};

export default FavoritePage;
