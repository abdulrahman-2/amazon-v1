import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const { images, price, discountPercentage, title } = product;

  return (
    <Link href={`product/${product?.id}`}>
      <div className="border rounded-md overflow-hidden shadow-md">
        <div className="relative bg-[#F7F8F8] p-5 h-[120px] md:h-[200px]">
          <Image
            src={images[0]}
            alt="product image"
            width={100}
            height={200}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-1">
          <div className="flex items-center gap-2 mb-1">
            {discountPercentage && (
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <span className="bg-red-600 text-xs text-white font-bold py-1 px-2">
                  {`${discountPercentage}% off`}
                </span>
                <span className="text-red-500 text-xs font-bold">
                  Limited time offer
                </span>
              </div>
            )}
          </div>
          <div>
            <span className="text-amazon_blue text-lg font-semibold mr-5">
              <sup className="text-xs">EGP</sup>
              {price}
            </span>
            {discountPercentage && (
              <span className="text-gray-500 line-through">
                <sup className="text-xs">EGP</sup>
                {(price - price * (discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-sm mt-1 line-clamp-1 text-amazon_blue">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
