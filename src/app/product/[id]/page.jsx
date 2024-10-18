import { FaRegEye } from "react-icons/fa";
import Image from "next/image";
import { discover, mastercard, paypal, verve, visa } from "@/src/assets";
import { MdStar } from "react-icons/md";
import { getSingleProduct } from "@/src/lib/data/apiData";
import ProductImages from "@/src/components/singleProduct/ProductImages";
import AddToCartBtn from "@/src/components/buttons/AddToCartBtn";

// Custom metadata generation
export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const product = await getSingleProduct(id);

  return {
    title: product.title,
    product: product.description,
  };
};

const Product = async ({ params }) => {
  const { id } = params;

  let product;
  try {
    product = await getSingleProduct(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    product = null;
  }

  // Payment method images
  const paymentImg = [
    { id: 1, img: visa },
    { id: 2, img: discover },
    { id: 3, img: mastercard },
    { id: 4, img: paypal },
    { id: 5, img: verve },
  ];

  return (
    <div>
      <div className="container mx-auto p-3 grid grid-cols-1 gap-10 md:grid-cols-2 py-10">
        <div>
          <ProductImages product={product} />
        </div>
        <div className="flex flex-col gap-7">
          <h2 className="text-3xl text-amazon_blue font-bold">
            {product?.title || "Product Not Found"}
          </h2>
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
            <div>
              {product?.discountPercentage && (
                <>
                  <span className="mr-3 text-gray-500 line-through">
                    <sup className="text-xs">EGP</sup>
                    {product?.price.toFixed(2)}
                  </span>
                  <span className="text-amazon_blue text-lg font-bold">
                    <sup className="text-xs">EGP</sup>
                    {(
                      product?.price *
                      (1 - product?.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                </>
              )}
            </div>
            {/* Review */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const filled = index + 1 <= Math.floor(product?.rating);
                const halfFilled =
                  index + 1 > Math.floor(product?.rating) &&
                  index < Math.ceil(product?.rating);

                return (
                  <MdStar
                    key={index}
                    className={`${
                      filled
                        ? "text-amazon_orangeDark"
                        : halfFilled
                        ? "text-amazon_yellowDark"
                        : "text-gray-300"
                    }`}
                  />
                );
              })}
              <span className="text-amazon_blue font-semibold">
                {`(${product?.rating} reviews)`}
              </span>
            </div>
          </div>
          <p className="flex items-center">
            <FaRegEye className="mr-1" />
            <span className="font-semibold">
              250+ people have viewed this product
            </span>
          </p>
          <p className="font-semibold">
            You are saving
            <span className="text-green-500 mx-0.5">
              {`$${product?.discountPercentage?.toFixed(2)}`}
            </span>
            upon this product
          </p>
          <p className="text-gray-600 font-semibold">
            {product?.description || "Details not available for this product."}
          </p>
          <p className="text-gray-600 font-semibold">
            Brand:{" "}
            <span className="font-bold text-amazon_blue">{product?.brand}</span>
          </p>
          <p className="text-gray-600 font-semibold">
            Category:{" "}
            <span className="font-bold text-amazon_blue">
              {product?.category}
            </span>
          </p>
          <div className="text-gray-600 font-semibold">
            Tags:{" "}
            {product?.tags?.map((item, index) => (
              <span key={index} className="font-bold text-amazon_blue">
                {item}
                {index !== product?.tags.length - 1 && ", "}
              </span>
            ))}
          </div>
          {<AddToCartBtn product={product} />}
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-gray-200 p-9 h-24 flex items-center gap-1 rounded-md">
              {paymentImg.map((item) => (
                <Image
                  key={item.id}
                  src={item.img}
                  alt="payment method"
                  className="w-full h-full object-contain cursor-pointer"
                />
              ))}
            </div>
            <p className="font-bold text-amazon_blue">
              Guaranteed Safe & Secure Checkout
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 mb-10 p-0 md:p-5">
        <h2 className="text-center md:py-5 pt-5 pb-2 text-xl font-semibold">
          Top reviews:
        </h2>
        <div className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {product.reviews?.map((review) => (
            <div key={review.rating} className="bg-white rounded-lg p-6">
              <div className="flex flex-col gap-1 mb-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-lg">
                    {review.reviewerName}
                  </h3>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const filled = index + 1 <= Math.floor(review?.rating);
                      const halfFilled =
                        index + 1 > Math.floor(review?.rating) &&
                        index < Math.ceil(review?.rating);

                      return (
                        <MdStar
                          size={20}
                          key={index}
                          className={`${
                            filled
                              ? "text-amazon_orangeDark"
                              : halfFilled
                              ? "text-amazon_yellowDark"
                              : "text-gray-300"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
                <span>{review.reviewerEmail}</span>
              </div>
              <p className="text-gray-600 font-medium">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
