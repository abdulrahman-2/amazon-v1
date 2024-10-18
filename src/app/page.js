import CarouselBanner from "@/src/components/banner/CarouselBanner";
import CategoryList from "@/src/components/categories/CategoryList";
import ProductsImageList from "@/src/components/products/ProductsImagesList";
import ProductsList from "@/src/components/products/ProductsList";
import {
  budgets,
  deals,
  gamingCategories,
  guides,
  offers,
  organizersCategories,
  shoppingPerks,
} from "@/src/lib/data/localData";
import OffersList from "@/src/components/offersLists/OffersList";

const Home = () => {
  return (
    <main className="bg-[#e3e6e6]">
      <CarouselBanner />

      <div className="-mt-[100px] md:-mt-[415px] relative z-30 pb-10">
        <CategoryList categories={offers} />

        <CategoryList categories={deals} />

        <ProductsList
          start={0}
          end={8}
          title={"Shop Today's Deals"}
          linkName={"See All Deals"}
        />

        <OffersList
          offers={budgets}
          title={"Save more with the Budget Store"}
          link={"Shop all deals"}
        />

        <CategoryList categories={gamingCategories} />

        <OffersList
          offers={shoppingPerks}
          title={"Enjoy your shopping perks"}
          link={"Start Shopping"}
        />

        <ProductsList
          start={8}
          end={16}
          title={"Deals Under 250 EGP"}
          linkName={"See All Deals"}
        />

        <CategoryList categories={organizersCategories} />

        <ProductsImageList
          title={"For Him, For Her & More"}
          linkName={"Shope Now"}
          start={0}
          end={15}
        />

        <ProductsImageList
          title={"Hair Styling, Electric Shavers & More"}
          linkName={"Shope Now"}
          start={15}
          end={30}
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
