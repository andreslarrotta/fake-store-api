'use client';

import { formatPrice } from '../../../shared/utils/format';
import { useCart } from '../hooks/useCart';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

export default function CartSummary() {
  const { getTotalItems, getTotalPrice, clearCart } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) {
    return (
      <Card className="text-center">
        <p className="text-[#4A4A4A] text-lg">Your cart is empty</p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-6 text-[#1A4D2E] font-heading">Order Summary</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-[#4A4A4A]">Items:</span>
          <span className="font-semibold text-[#1A4D2E]">{totalItems}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold pt-4 border-t border-[#E0E0E0]">
          <span className="text-[#1A4D2E]">Total:</span>
          <span className="text-[#1A4D2E]">{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <div className="space-y-3">
        <Button variant="primary" size="lg" className="w-full">
          Checkout
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="w-full"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>
    </Card>
  );
}
