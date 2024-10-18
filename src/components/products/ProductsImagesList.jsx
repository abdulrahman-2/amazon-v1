"use client";

import { useEffect, useRef, useState } from "react";
import Loading from "@/src/app/loading";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import Title from "../title/Title";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getProducts } from "@/src/lib/data/apiData";

const ProductsImageList = ({ start, end, title, linkName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, []);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="container mx-auto p-3">
      <div className="relative bg-white rounded-md p-3 md:p-5">
        {loading ? (
          <Loading color="black" width={80} height={80} />
        ) : error ? (
          <div className="text-red-500">
            Failed to load products. Please try again.
          </div>
        ) : (
          <>
            <Title title={title} link={linkName} />
            <Swiper
              spaceBetween={10}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 5,
                },
                1536: {
                  slidesPerView: 6,
                },
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {products.slice(start, end).map((product) => (
                <SwiperSlide key={product.id}>
                  <Link href={`product/${product.id}`}>
                    <div className="relative h-[120px] md:h-[200px]">
                      <Image
                        src={product.images[0]}
                        alt="product image"
                        width={100}
                        height={200}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
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
  );
};

export default ProductsImageList;
