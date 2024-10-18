"use client";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import Title from "../title/Title";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRef } from "react";

const OffersList = ({ offers, title, link }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="container mx-auto p-3">
      <div className="relative bg-white rounded-md p-3 md:p-5">
        <Title title={title} link={link} />
        <Swiper
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
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
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="relative w-full h-[220px]">
                <Image
                  src={offer.img}
                  alt={`Budget item ${offer.id}`}
                  fill
                  loading="lazy"
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, 
                         (max-width: 768px) 33vw, 
                         (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="navigateBtn">
          <button
            ref={prevRef}
            className="absolute w-10 md:w-16 flex items-center justify-center shadow-md z-20 top-1/2 translate-y-[-50%] left-0 h-20 text-black/50 md:h-24 bg-white/60 rounded-e-lg"
          >
            <MdArrowBackIos size={30} />
          </button>
          <button
            ref={nextRef}
            className="absolute w-10 md:w-16 flex items-center justify-center shadow-md z-20 top-1/2 translate-y-[-50%] right-0 h-20 text-black/50 md:h-24 bg-white/60 rounded-s-lg"
          >
            <MdArrowForwardIos size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffersList;
