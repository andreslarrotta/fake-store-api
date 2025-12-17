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
      <Card className="h-full flex flex-col">
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-xs text-gray-500 uppercase">{product.category}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium">{formatRating(product.rating.rate)}</span>
              <span className="text-xs text-gray-500">({product.rating.count})</span>
            </div>
            <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
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

