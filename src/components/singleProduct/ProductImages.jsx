"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ product }) => {
  const [imgUrl, setImgUrl] = useState(product?.images[0]);

  const handleImgUrl = (image) => {
    setImgUrl(image);
  };

  return (
    <div className="flex flex-col-reverse xl:flex-row items-start gap-2">
      <div className="flex flex-row xl:flex-col gap-3">
        {product?.images.map((image, index) => (
          <Image
            onClick={() => handleImgUrl(image)}
            key={index}
            src={image}
            alt="product image"
            width={100}
            height={100}
            className={`object-contain h-20 w-20 cursor-pointer opacity-75 ${
              imgUrl === image && "opacity-100 border border-amazon_orange"
            } bg-[#e3e6e6] p-2 rounded-md`}
          />
        ))}
      </div>
      <div className="w-full h-[400px] md:h-[500px] lg:h-[640px] relative">
        <Image
          src={imgUrl}
          alt="product image"
          fill
          className="object-contain bg-[#e3e6e6] p-10 rounded-md"
        />
      </div>
    </div>
  );
};

export default ProductImages;
