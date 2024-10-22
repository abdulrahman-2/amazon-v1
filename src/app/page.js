"use client";

import CarouselBanner from "@/src/components/banner/CarouselBanner";
import CategoryList from "@/src/components/categories/CategoryList";
import ProductsImageList from "@/src/components/products/ProductsImagesList";
import ProductsList from "@/src/components/products/ProductsList";
import { budgets, guides, shoppingPerks } from "@/src/lib/data/localData";
import OffersList from "@/src/components/offersLists/OffersList";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Home = () => {
  const { sectionOne, sectionTwo, sectionThree, sectionFour } =
    useContext(ProductContext);
  return (
    <main className="bg-[#e3e6e6]">
      <CarouselBanner />

      <div className="-mt-[100px] md:-mt-[410px] relative z-30 pb-10">
        <CategoryList categories={sectionOne} />

        <CategoryList categories={sectionTwo} />

        <ProductsList
          start={0}
          end={10}
          title={"Shop Today's Deals"}
          linkName={"See All Deals"}
        />

        <OffersList
          offers={budgets}
          title={"Save more with the Budget Store"}
          link={"Shop all deals"}
        />

        <CategoryList categories={sectionThree} />

        <OffersList
          offers={shoppingPerks}
          title={"Enjoy your shopping perks"}
          link={"Start Shopping"}
        />

        <ProductsList
          start={10}
          end={20}
          title={"Deals Under 250 EGP"}
          linkName={"See All Deals"}
        />

        <CategoryList categories={sectionFour} />

        <ProductsImageList
          title={"For Him, For Her & More"}
          linkName={"Shope Now"}
          start={30}
          end={40}
        />

        <ProductsImageList
          title={"Hair Styling, Electric Shavers & More"}
          linkName={"Shope Now"}
          start={40}
          end={50}
        />

        <OffersList
          offers={guides}
          title={"Your Amazon go-to guide"}
          link={"Learn More"}
        />
      </div>
    </main>
  );
};

export default Home;
