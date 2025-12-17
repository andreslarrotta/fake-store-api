'use client';

import Image from 'next/image';
import Link from 'next/link';
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
    <div className="flex items-center gap-6 p-6 border-b border-[#E0E0E0] last:border-b-0">
      <Link href={`/products/${product.id}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 bg-[#F5F5F5] rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-2"
            sizes="96px"
          />
        </div>
      </Link>
      <div className="flex-grow min-w-0">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 text-[#1A4D2E] font-heading hover:text-[#2D5F3F] transition-colors">{product.title}</h3>
        </Link>
        <p className="text-[#4A4A4A] text-sm mb-3">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[#E0E0E0] rounded-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="!rounded-full !px-3 !py-1 !min-w-[36px]"
            >
              -
            </Button>
            <span className="w-12 text-center font-semibold text-[#1A4D2E]">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="!rounded-full !px-3 !py-1 !min-w-[36px]"
            >
              +
            </Button>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => removeItem(product.id)}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-xl text-[#1A4D2E]">{formatPrice(product.price * quantity)}</p>
      </div>
    </div>
  );
}
