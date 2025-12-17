import { Product } from '../types/product.types';

const API_BASE_URL = 'https://fakestoreapi.com';

export const productsService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async getProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    return response.json();
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products in category ${category}`);
    }
    return response.json();
  },

  async getAllCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },
};

