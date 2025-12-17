'use client';

import { useProducts } from '@/features/products/hooks/useProducts';
import ProductList from '@/features/products/components/ProductList';
import ProductFilters from '@/features/products/components/ProductFilters';
import Link from 'next/link';
import { useCart } from '@/features/cart/hooks/useCart';
import Button from '@/shared/ui/Button';

export default function HomePage() {
  const {
    products,
    loading,
    error,
    categories,
    filters,
    setFilters,
    sortOption,
    setSortOption,
  } = useProducts();
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] fixed top-0 w-full z-50">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#1A4D2E] font-heading">E-commerce Dashboard</h1>
            <Link href="/cart">
              <Button variant="primary" size="md">
                Cart ({cartItemsCount})
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 pt-32 pb-20">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            Error: {error}
          </div>
        )}

        <ProductFilters
          categories={categories}
          filters={filters}
          onFiltersChange={setFilters}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        <ProductList products={products} loading={loading} />
      </main>
    </div>
  );
}
