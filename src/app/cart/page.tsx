'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import CartItem from '@/features/cart/components/CartItem';
import CartSummary from '@/features/cart/components/CartSummary';
import Link from 'next/link';
import Button from '@/shared/ui/Button';

export default function CartPage() {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-20">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold mb-4 text-[#1A4D2E] font-heading">Shopping Cart</h1>
          <Link href="/">
            <Button variant="secondary" size="sm">
              ← Continue Shopping
            </Button>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#4A4A4A] text-lg mb-6">Your cart is empty</p>
            <Link href="/">
              <Button variant="primary">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#E0E0E0] overflow-hidden">
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
