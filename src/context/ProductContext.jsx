import { createContext, useState, useEffect } from "react";
import {
  getFilteredProducts,
  getCategoriesList,
  getLimitedProducts,
  getAllProducts,
} from "@/src/lib/data/apiData";

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
  const [limit] = useState(12);
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
      setError(null); // Reset error state before fetching
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
