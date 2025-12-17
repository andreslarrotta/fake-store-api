'use client';

import { useState, useEffect } from 'react';
import { ProductFilters, SortOption } from '../types/product.types';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import Button from '../../../shared/ui/Button';

interface ProductFiltersProps {
  categories: string[];
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function ProductFilters({
  categories,
  filters,
  onFiltersChange,
  sortOption,
  onSortChange,
}: ProductFiltersProps) {
  const [search, setSearch] = useState(filters.search || '');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFiltersChange({ ...filters, search: debouncedSearch || undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category === 'all' ? undefined : category,
    });
  };

  const handlePriceRangeChange = (min?: number, max?: number) => {
    onFiltersChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const clearFilters = () => {
    setSearch('');
    onFiltersChange({});
    onSortChange('default');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#E0E0E0] mb-8">
      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-[#1A4D2E] mb-2">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl focus:ring-2 focus:ring-[#C8FF00] focus:border-transparent transition-all"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-[#1A4D2E] mb-2">
            Category
          </label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl focus:ring-2 focus:ring-[#C8FF00] focus:border-transparent transition-all"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A4D2E] mb-2">
              Min Price
            </label>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) =>
                handlePriceRangeChange(
                  e.target.value ? Number(e.target.value) : undefined,
                  filters.maxPrice
                )
              }
              placeholder="Min"
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl focus:ring-2 focus:ring-[#C8FF00] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A4D2E] mb-2">
              Max Price
            </label>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                handlePriceRangeChange(
                  filters.minPrice,
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              placeholder="Max"
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl focus:ring-2 focus:ring-[#C8FF00] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold text-[#1A4D2E] mb-2">
            Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl focus:ring-2 focus:ring-[#C8FF00] focus:border-transparent transition-all"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Clear Filters */}
        <Button
          variant="secondary"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
