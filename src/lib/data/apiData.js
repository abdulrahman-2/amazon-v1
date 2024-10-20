import axios from "axios";

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  try {
    const response = await apiClient.get(
      `/products?limit=${limit}&skip=${skip}`
    );
    return {
      products: response.data.products,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getSingleProduct = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const getCategoriesList = async () => {
  try {
    const response = await apiClient.get("/products/category-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getFilteredProducts = async (category, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  try {
    const response = await apiClient.get(
      `/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    return {
      products: response.data.products,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
