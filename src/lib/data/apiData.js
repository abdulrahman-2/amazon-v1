import axios from "axios";

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/products");

    // Validate response data (optional)
    if (response.data && Array.isArray(response.data.products)) {
      return response.data.products; // Return only the products array
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const getSingleProduct = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);

    // Validate response data (optional)
    if (response.data) {
      return response.data; // Return the single product data
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error; // Re-throw the error for further handling if needed
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
