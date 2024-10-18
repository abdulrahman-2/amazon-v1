"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../singleProduct/ProductCard";
import Loading from "@/src/app/loading";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import Title from "../title/Title";
import { getProducts } from "@/src/lib/data/apiData";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductsList = ({ start, end, title, linkName }) => {
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
          <div className="flex flex-col items-center">
            <Loading color="black" width={80} height={80} />
            <p>Loading products...</p> {/* Loading message */}
          </div>
        ) : error ? (
          <div className="text-red-500">
            Failed to load products. Please try again.
          </div>
        ) : (
          <>
            <Title title={title} link={linkName} />
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
              {products.slice(start, end).map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
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

export default ProductsList;
