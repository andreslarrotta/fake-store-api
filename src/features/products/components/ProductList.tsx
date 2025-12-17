'use client';

import { Product } from '../types/product.types';
import ProductCard from './ProductCard';
import Loading from '../../../shared/ui/Loading';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductList({ products, loading }: ProductListProps) {
  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#4A4A4A] text-lg font-medium">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
