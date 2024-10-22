import { createContext, useState, useEffect } from "react";
import {
  getFilteredProducts,
  getCategoriesList,
  getLimitedProducts,
  getAllProducts,
} from "@/src/lib/data/apiData";

import {
  laptops,
  beauty,
  decoration,
  fragrances,
  kitchenAccessories,
  mensShirts,
  mensShoes,
  mensWatches,
  mobileAccessories,
  motorcycle,
  skinCare,
  smartphones,
  sunglasses,
  furniture,
  groseries,
  sport,
} from "@/src/assets/index";

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const priceRanges = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "$0 - $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $150", min: 100, max: 150 },
    { label: "$150 - $200", min: 150, max: 200 },
    { label: "Over $200", min: 200, max: Infinity },
  ];

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const products = await getAllProducts();
      setAllProducts(products);
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response =
          selectedCategory === "All Categories"
            ? await getLimitedProducts(page, limit)
            : await getFilteredProducts(selectedCategory, page, limit);

        const products = response.products;
        const total = response.total;

        // Filter products by price range
        const filteredByPrice = products.filter(
          (product) =>
            product.price >= selectedPriceRange.min &&
            product.price <= selectedPriceRange.max
        );

        setFilteredProducts(filteredByPrice);
        setTotalProducts(total);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, selectedCategory, selectedPriceRange]);

  useEffect(() => {
    const fetchCategoriesList = async () => {
      setError(null);
      try {
        const data = await getCategoriesList();
        setCategoriesList(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setError("Failed to fetch categories");
      }
    };

    fetchCategoriesList();
  }, []);

  const handleNextPage = () => {
    if (page < Math.ceil(totalProducts / limit)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const sectionOne = [
    {
      title: [categoriesList[0]],
      image: beauty,
      linkName: "See More",
      href: `/category/${[categoriesList[0]]}`,
    },
    {
      title: [categoriesList[1]],
      image: fragrances,
      linkName: "See More",
      href: `/category/${[categoriesList[1]]}`,
    },
    {
      title: [categoriesList[2]],
      image: furniture,
      linkName: "See More",
      href: `/category/${[categoriesList[2]]}`,
    },
    {
      title: [categoriesList[3]],
      image: groseries,
      linkName: "See More",
      href: `/category/${[categoriesList[3]]}`,
    },
  ];

  const sectionTwo = [
    {
      title: [categoriesList[4]],
      image: decoration,
      linkName: "See More",
      href: `/category/${[categoriesList[4]]}`,
    },
    {
      title: [categoriesList[5]],
      image: kitchenAccessories,
      linkName: "See More",
      href: `/category/${[categoriesList[5]]}`,
    },
    {
      title: [categoriesList[6]],
      image: laptops,
      linkName: "See More",
      href: `/category/${[categoriesList[6]]}`,
    },
    {
      title: [categoriesList[7]],
      image: mensShirts,
      linkName: "See More",
      href: `/category/${[categoriesList[7]]}`,
    },
  ];

  const sectionThree = [
    {
      title: [categoriesList[8]],
      image: mensShoes,
      linkName: "See More",
      href: `/category/${[categoriesList[8]]}`,
    },
    {
      title: [categoriesList[9]],
      image: mensWatches,
      linkName: "See More",
      href: `/category/${[categoriesList[9]]}`,
    },
    {
      title: [categoriesList[10]],
      image: mobileAccessories,
      linkName: "See More",
      href: `/category/${[categoriesList[10]]}`,
    },
    {
      title: [categoriesList[11]],
      image: motorcycle,
      linkName: "See More",
      href: `/category/${[categoriesList[11]]}`,
    },
  ];

  const sectionFour = [
    {
      title: [categoriesList[12]],
      image: skinCare,
      linkName: "See More",
      href: `/category/${[categoriesList[12]]}`,
    },
    {
      title: [categoriesList[13]],
      image: smartphones,
      linkName: "See More",
      href: `/category/${[categoriesList[13]]}`,
    },
    {
      title: [categoriesList[14]],
      image: sport,
      linkName: "See More",
      href: `/category/${[categoriesList[14]]}`,
    },
    {
      title: [categoriesList[15]],
      image: sunglasses,
      linkName: "See More",
      href: `/category/${[categoriesList[15]]}`,
    },
  ];

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        categoriesList,
        loading,
        error,
        page,
        handleNextPage,
        handlePreviousPage,
        totalProducts,
        limit,
        priceRanges,
        selectedPriceRange,
        setSelectedPriceRange,
        sectionOne,
        sectionTwo,
        sectionThree,
        sectionFour,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
