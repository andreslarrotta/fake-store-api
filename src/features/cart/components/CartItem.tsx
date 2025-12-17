'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '../types/cart.types';
import { formatPrice } from '../../../shared/utils/format';
import Button from '../../../shared/ui/Button';
import { useCart } from '../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <div className="relative w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
          sizes="96px"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(product.id, quantity - 1)}
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            +
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => removeItem(product.id)}
            className="ml-4"
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">{formatPrice(product.price * quantity)}</p>
      </div>
    </div>
  );
}

