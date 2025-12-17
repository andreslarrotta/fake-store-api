'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import CartItem from '@/features/cart/components/CartItem';
import CartSummary from '@/features/cart/components/CartSummary';
import Link from 'next/link';
import Button from '@/shared/ui/Button';

export default function CartPage() {
  const { items } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <Link href="/">
            <Button variant="outline" size="sm">
              ← Continue Shopping
            </Button>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <Link href="/">
              <Button variant="primary">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

