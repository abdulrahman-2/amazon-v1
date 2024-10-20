import { createContext, useState, useEffect } from "react";
import {
  getFilteredProducts,
  getCategoriesList,
  getLimitedProducts,
  getAllProducts,
} from "@/src/lib/data/apiData";

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [limitedProducts, setLimitedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPrice, setMinPrice] = useState(0); // Min price state
  const [maxPrice, setMaxPrice] = useState(0); // Max price state

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
      try {
        if (selectedCategory === "All Categories") {
          const { products, total } = await getLimitedProducts(page, limit);
          setLimitedProducts(products);
          setTotalProducts(total);
        } else {
          const { products, total } = await getFilteredProducts(
            selectedCategory,
            page,
            limit
          );
          setFilteredProducts(products);
          setTotalProducts(total);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
        setError("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, selectedCategory]);

  // Fetch categories on initial render
  useEffect(() => {
    const fetchCategoriesList = async () => {
      try {
        const data = await getCategoriesList();
        setCategoriesList(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setError("Failed to fetch categories", error);
      }
    };

    fetchCategoriesList();
  }, []);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  const products =
    selectedCategory === "All Categories" ? limitedProducts : filteredProducts;

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        products,
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
        setMinPrice,
        setMaxPrice,
        minPrice,
        maxPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
