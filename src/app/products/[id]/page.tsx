import { notFound } from 'next/navigation';
import Image from 'next/image';
import { productsService } from '@/features/products/api/products.service';
import { formatPrice, formatRating } from '@/shared/utils/format';
import AddToCartButton from './AddToCartButton';
import Link from 'next/link';
import Button from '@/shared/ui/Button';

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
    <div className="min-h-screen bg-[#F5F5F5] pt-20">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <Link href="/" className="mb-6 inline-block">
          <Button variant="secondary" size="sm">
            ← Back to Products
          </Button>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative w-full h-96 md:h-[600px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#E0E0E0] overflow-hidden">
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
              <span className="text-sm text-[#4A4A4A] uppercase font-semibold mb-2 inline-block">{product.category}</span>
              <h1 className="text-4xl font-semibold mt-2 mb-4 text-[#1A4D2E] font-heading">{product.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFD700] text-2xl">★</span>
                  <span className="font-semibold text-lg">{formatRating(product.rating.rate)}</span>
                  <span className="text-[#4A4A4A]">({product.rating.count} reviews)</span>
                </div>
              </div>
              <p className="text-5xl font-bold text-[#1A4D2E] mb-8">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="border-t border-[#E0E0E0] pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#1A4D2E] font-heading">Description</h2>
              <p className="text-[#4A4A4A] leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="pt-4">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
