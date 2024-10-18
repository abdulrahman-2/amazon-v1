import { egyptFlag, logo } from "@/src/assets";
import Image from "next/image";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
    <div>
      {/* top footer  */}
      <div className="  bg-amazon_light text-white">
        <div className="container px-3 py-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="mb-4 font-bold text-xl">Get to Know Us</h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>About Amazon</li>
              <li>Careers</li>
              <li>Amazon Science</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-xl">Shop with Us</h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>Your Account</li>
              <li>Your Orders</li>
              <li>Your Addresses</li>
              <li>Your Lists</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-xl">Make Money with Us</h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>Protect and build your brand</li>
              <li>Advertise Your Products</li>
              <li>Sell on Amazon</li>
              <li>Fulfillment by Amazon</li>
              <li>Supply to Amazon</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-xl">Let Us Help You</h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>Help</li>
              <li>Shipping & Delivery</li>
              <li>Returns & Replacements</li>
              <li>Recalls and Product Safety Alerts</li>
              <li>Amazon App Download</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-center gap-6 md:gap-20 px-3 py-10">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className="w-[90px] object-cover headerItem"
              priority
            />
          </Link>
          <div className="flex items-center gap-3 md:gap-5">
            <div className="flex items-center gap-2 p-1 border border-amazon_lightText rounded-sm">
              <TbWorld size={20} className="text-white" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-2 p-1 border border-amazon_lightText rounded-sm">
              <Image src={egyptFlag} alt="egypt flag" className="w-[20px]" />
              <span>Egypt</span>
            </div>
          </div>
        </div>
      </div>
      {/* bottom footer  */}
      <div className="bg-amazon_blue text-white">
        <div className="container px-3 py-7 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-5">
            <ul className="flex flex-col gap-1 text-xs">
              <li className="font-bold text-sm">Amazon Advertising</li>
              <li>Find, attract, and</li>
              <li>engage customers</li>
            </ul>
            <ul className="flex flex-col gap-1 text-xs">
              <li className="font-bold text-sm">Audible</li>
              <li>Download</li>
              <li>Audio Books</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <ul className="flex flex-col gap-1 text-xs">
              <li className="font-bold text-sm">Sell on Amazon Start</li>
              <li>Selling Online Today!</li>
            </ul>
            <ul className="flex flex-col gap-1 text-xs">
              <li className="font-bold text-sm">IMDb</li>
              <li>Movies, </li>
              <li>TV & Celebrities</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <ul className="flex flex-col gap-1 text-xs">
              <li className="font-bold text-sm">Amazon Web Services</li>
              <li>Scalable Cloud</li>
              <li>Computing Services</li>
            </ul>
            <ul className="flex flex-col gap-1 text-xs">
              <li className="font-bold text-sm">Alexa</li>
              <li>Actionable Analytics</li>
              <li>for the Web</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <ul className="flex flex-col gap-1 text-xs">
              <li className="font-bold text-sm">Goodreads</li>
              <li>Goodreads Book reviews</li>
              <li>& recommendations</li>
            </ul>
            <ul className="flex flex-col gap-1 text-xs">
              <li className="font-bold text-sm">Shopbop</li>
              <li>Designer</li>
              <li>Fashion Brands</li>
            </ul>
          </div>
        </div>
        <p className="text-white px-3 text-center mx-auto text-sm pb-5 max-w-[400px]">
          Made With ❤️ By Abdulraham Attallah
        </p>
      </div>
    </div>
  );
};

export default Footer;
