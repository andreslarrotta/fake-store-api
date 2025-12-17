import { notFound } from 'next/navigation';
import Image from 'next/image';
import { productsService } from '@/features/products/api/products.service';
import { formatPrice, formatRating } from '@/shared/utils/format';
import Button from '@/shared/ui/Button';
import AddToCartButton from './AddToCartButton';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    notFound();
  }

  let product;
  try {
    product = await productsService.getProductById(productId);
  } catch (error) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative w-full h-96 md:h-[500px] bg-gray-100 rounded-lg">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-gray-500 uppercase">{product.category}</span>
              <h1 className="text-3xl font-bold mt-2 mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="font-medium">{formatRating(product.rating.rate)}</span>
                  <span className="text-gray-500">({product.rating.count} reviews)</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-600 mb-6">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

