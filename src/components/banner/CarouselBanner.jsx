"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import {
  bannerImgFive,
  bannerImgFour,
  bannerImgOne,
  bannerImgThree,
  bannerImgTwo,
} from "@/src/assets";

const CarouselBanner = () => {
  const bannerImages = [
    { title: "bannerOne", source: bannerImgOne },
    { title: "bannerTwo", source: bannerImgTwo },
    { title: "bannerThree", source: bannerImgThree },
    { title: "bannerFour", source: bannerImgFour },
    { title: "bannerFive", source: bannerImgFive },
  ];

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {bannerImages.map((banner) => (
          <SwiperSlide key={banner.title}>
            <Image
              src={banner.source}
              alt={banner.title}
              priority
              className="w-full h-[250px] md:h-[calc(100vh-100px)] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 z-10 bg-gradient-to-t from-gray-900/60 to-transparent" />
    </div>
  );
};

export default CarouselBanner;
