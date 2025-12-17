'use client';

import { useState, useEffect } from 'react';
import { productsService } from '../api/products.service';
import { Product, ProductFilters, SortOption } from '../types/product.types';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  refetch: () => void;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        productsService.getAllProducts(),
        productsService.getAllCategories(),
      ]);
      setAllProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // Keep original order
        break;
    }

    setProducts(filtered);
  }, [allProducts, filters, sortOption]);

  return {
    products,
    loading,
    error,
    categories,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    refetch: fetchProducts,
  };
}

