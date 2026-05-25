import Link from 'next/link';
import { fetchProductsByCategory, fetchProductCategory, fetchProductPricing } from '../../../lib/api';
import ProductGrid from '../../../components/ProductGrid';

export const dynamic = 'force-dynamic';

type ProductsPageParams = {
  categoryId: string;
};

interface Pricing {
  attributes: {
    min: number;
    max?: number;
    Price: number;
  };
}

interface Product {
  id: string;
  attributes: {
    Name: string;
    Description: string;
    Price: number;
    Photo?: {
      data?: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
  };
}

interface PricingData {
  data: Pricing[];
}

interface ProductWithPricing extends Product {
  pricing: Pricing[];
}

const fallbackProductsByCategory: Record<string, Product[]> = {
  offset: [
    { id: 'offset-1', attributes: { Name: 'Business Cards', Description: 'Premium business cards with polished finishes.', Price: 1200, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } },
    { id: 'offset-2', attributes: { Name: 'Brochures', Description: 'Custom brochures for launches, events, and client presentations.', Price: 1800, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } }
  ],
  digital: [
    { id: 'digital-1', attributes: { Name: 'Flyers', Description: 'Fast-turnaround flyers for promotions and campaigns.', Price: 900, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } },
    { id: 'digital-2', attributes: { Name: 'Posters', Description: 'High-impact posters for retail and event displays.', Price: 1500, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } }
  ],
  advertising: [
    { id: 'advertising-1', attributes: { Name: 'Hoarding Boards', Description: 'Bold outdoor boards designed for visibility.', Price: 3200, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } },
    { id: 'advertising-2', attributes: { Name: 'Flex Banners', Description: 'Durable flex banners for indoor and outdoor branding.', Price: 1100, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } }
  ],
  garment: [
    { id: 'garment-1', attributes: { Name: 'Uniforms', Description: 'Custom uniforms tailored for brands, schools, and teams.', Price: 2200, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } },
    { id: 'garment-2', attributes: { Name: 'T-Shirts', Description: 'Comfortable custom tees for events, teams, and campaigns.', Price: 950, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } }
  ]
};

const fallbackCategoryNames: Record<string, string> = {
  offset: 'OFFSET',
  digital: 'DIGITAL',
  advertising: 'ADVERTISING',
  garment: 'GARMENT'
};

export default async function ProductsPage({ params }: { params: ProductsPageParams }) {
  const { categoryId } = params;
  const [products, categoryName] = await Promise.all([
    fetchProducts(categoryId),
    fetchCategoryName(categoryId)
  ]);

  const productsWithPricing: ProductWithPricing[] = await Promise.all(
    products.map(async (product: Product) => {
      try {
        const pricingData = await fetchProductPricing(product.id);
        return { ...product, pricing: pricingData || [] };
      } catch (error) {
        console.error(`Error fetching pricing for product ${product.id}:`, error);
        return { ...product, pricing: [] };
      }
    })
  );

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <main className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400 font-sans">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-sans">
            Explore our wide range of high-quality printing products in this category.
          </p>
        </div>
        
        <ProductGrid products={productsWithPricing} />
        
        <div className="mt-16 text-center">
          <Link href="/category">
            <span className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full hover:bg-yellow-300 transition duration-300 text-lg font-semibold font-sans">
              Back to Categories
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}

async function fetchProducts(categoryId: string): Promise<Product[]> {
  try {
    const response = await fetchProductsByCategory(categoryId);
    return Array.isArray(response) && response.length > 0 ? response : fallbackProductsByCategory[categoryId] || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return fallbackProductsByCategory[categoryId] || [];
  }
}

async function fetchCategoryName(categoryId: string): Promise<string> {
  try {
    const response = await fetchProductCategory(categoryId);
    return response?.attributes?.Name || fallbackCategoryNames[categoryId] || 'Unknown Category';
  } catch (error) {
    console.error('Error fetching category name:', error);
    return fallbackCategoryNames[categoryId] || 'Unknown Category';
  }
}
