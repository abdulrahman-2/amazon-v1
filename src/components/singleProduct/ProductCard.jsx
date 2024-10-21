import Image from "next/image";
import Link from "next/link";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/src/lib/store/features/FavoriteSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { favoriteItems } = useSelector((state) => state.favorite);
  const existingFavorite = favoriteItems.some(
    (item) => item.id === product?.id
  );

  const { images, price, discountPercentage, title } = product;

  const discountedPrice = discountPercentage
    ? (price - price * (discountPercentage / 100)).toFixed(2)
    : null;

  const dispatch = useDispatch();

  const handleFavorite = () => {
    if (existingFavorite) {
      dispatch(removeFromFavorite(product));
      toast.success(
        `${product.title.substring(0, 12)}... removed from favorites`
      );
    } else {
      dispatch(addToFavorite(product));
      toast.success(`${product.title.substring(0, 12)}... added to favorites`);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden shadow-md relative">
      <div className="absolute z-20 top-2 right-2 flex flex-col gap-1">
        <MdOutlineFavoriteBorder
          onClick={handleFavorite}
          size={20}
          aria-label="Toggle Favorite"
          className={`${
            existingFavorite
              ? "text-white bg-red-500"
              : "text-amazon_light bg-white"
          } cursor-pointer w-7 h-7 rounded-full p-[5px]`}
        />
        <Link href={`products/${product?.id}`} passHref>
          <IoEyeOutline
            size={20}
            aria-label="View Product"
            className="text-amazon_light cursor-pointer w-7 h-7 bg-white rounded-full p-[5px]"
          />
        </Link>
      </div>
      <Link href={`products/${product?.id}`} passHref>
        <div className="relative bg-[#F7F8F8] p-5 h-[120px] md:h-[200px]">
          <Image
            src={images?.[0] || "/placeholder-image.jpg"}
            alt={title}
            width={200}
            height={200}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
      <div className="p-1">
        {discountPercentage && (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-1">
            <span className="bg-red-600 text-xs text-white font-bold py-1 px-2">
              {`${discountPercentage}% off`}
            </span>
            <span className="text-red-500 text-xs font-bold">
              Limited time offer
            </span>
          </div>
        )}
        <div>
          <span className="text-amazon_blue text-lg font-semibold mr-5">
            <sup className="text-xs">EGP</sup>
            {discountedPrice || price.toFixed(2)}
          </span>
          {discountedPrice && (
            <span className="text-gray-500 line-through">
              <sup className="text-xs">EGP</sup>
              {price.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-sm mt-1 line-clamp-1 text-amazon_blue">{title}</p>
      </div>
    </div>
  );
};

export default ProductCard;
