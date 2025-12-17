'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product.types';
import { formatPrice, formatRating } from '../../../shared/utils/format';
import Card from '../../../shared/ui/Card';
import Button from '../../../shared/ui/Button';
import { useCart } from '../../cart/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full flex flex-col p-0 overflow-hidden">
        <div className="relative w-full h-64 bg-[#F5F5F5]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-xs text-[#4A4A4A] uppercase font-medium">{product.category}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-[#1A4D2E] font-heading">{product.title}</h3>
          <p className="text-sm text-[#4A4A4A] mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="text-[#FFD700] text-lg">★</span>
              <span className="text-sm font-semibold">{formatRating(product.rating.rate)}</span>
              <span className="text-xs text-[#4A4A4A]">({product.rating.count})</span>
            </div>
            <span className="text-xl font-bold text-[#1A4D2E]">{formatPrice(product.price)}</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </Link>
  );
}
