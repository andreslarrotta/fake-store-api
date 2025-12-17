'use client';

import { Product } from '@/features/products/types/product.types';
import { useCart } from '@/features/cart/hooks/useCart';
import Button from '@/shared/ui/Button';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleAddToCart}
      isLoading={isAdding}
      className="w-full"
    >
      {isAdding ? 'Added!' : 'Add to Cart'}
    </Button>
  );
}

