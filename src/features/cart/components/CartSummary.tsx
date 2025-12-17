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
      <Card className="p-6 text-center">
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Items:</span>
          <span className="font-medium">{totalItems}</span>
        </div>
        <div className="flex justify-between text-xl font-bold pt-4 border-t">
          <span>Total:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <div className="space-y-2">
        <Button variant="primary" size="lg" className="w-full">
          Checkout
        </Button>
        <Button
          variant="outline"
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

