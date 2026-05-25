import axios from 'axios';

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '') || 'https://strapi-graphichouse-v1-iwpx.onrender.com';
const API_URL = `${STRAPI_HOST}/api`;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.warn('[Strapi] STRAPI_API_TOKEN is not configured. Live content will fall back to demo data until the Render env var is set.');
}

const fallbackCategories = [
  {
    id: 'offset',
    attributes: {
      Name: 'OFFSET',
      Photo: { data: [{ attributes: { url: '/logo.jpg', alternativeText: 'Offset printing' } }] },
      products: { data: [{ attributes: { Name: 'Business Cards' } }, { attributes: { Name: 'Brochures' } }] }
    }
  },
  {
    id: 'digital',
    attributes: {
      Name: 'DIGITAL',
      Photo: { data: [{ attributes: { url: '/logo.jpg', alternativeText: 'Digital printing' } }] },
      products: { data: [{ attributes: { Name: 'Flyers' } }, { attributes: { Name: 'Posters' } }] }
    }
  },
  {
    id: 'advertising',
    attributes: {
      Name: 'ADVERTISING',
      Photo: { data: [{ attributes: { url: '/logo.jpg', alternativeText: 'Advertising materials' } }] },
      products: { data: [{ attributes: { Name: 'Hoarding Boards' } }, { attributes: { Name: 'Flex Banners' } }] }
    }
  },
  {
    id: 'garment',
    attributes: {
      Name: 'GARMENT',
      Photo: { data: [{ attributes: { url: '/logo.jpg', alternativeText: 'Garment printing' } }] },
      products: { data: [{ attributes: { Name: 'Uniforms' } }, { attributes: { Name: 'T-Shirts' } }] }
    }
  }
];

const fallbackProducts = {
  offset: [
    { id: 'offset-1', attributes: { Name: 'Business Cards', Description: 'Premium business cards with polished finishes.', Price: 1200, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } },
    { id: 'offset-2', attributes: { Name: 'Brochures', Description: 'Custom brochures for product launches and events.', Price: 1800, Photo: { data: [{ attributes: { url: '/placeholder-product-image.jpg' } }] } } }
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

const axiosOptions = {
  baseURL: API_URL,
};

if (STRAPI_API_TOKEN) {
  axiosOptions.headers = {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  };
}

const axiosInstance = axios.create(axiosOptions);

const normalizeCollection = (response) => response?.data?.data ?? [];
const normalizeSingle = (response) => response?.data?.data ?? response?.data ?? null;
const normalizePricing = (response) => {
  const payload = response?.data?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload ? [payload] : [];
};

export const fetchProductCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories?populate=*');
    return normalizeCollection(response);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return fallbackCategories;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(
      `/products?filters[category][id][$eq]=${categoryId}&populate=*`
    );
    return normalizeCollection(response);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return fallbackProducts[categoryId] || [];
  }
};

export const fetchProductCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}?populate=*`);
    return normalizeSingle(response);
  } catch (error) {
    console.error('Error fetching product category:', error);
    const category = fallbackCategories.find((item) => item.id === categoryId);
    return {
      attributes: {
        Name: category?.attributes.Name || 'Unknown Category'
      }
    };
  }
};

export const fetchProductDetails = async (productId) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}?populate=*`);
    return normalizeSingle(response);
  } catch (error) {
    console.error('Error fetching product details:', error);
    return { attributes: { Name: 'Product Details Unavailable' } };
  }
};

export const fetchProductPricing = async (productId) => {
  try {
    const response = await axiosInstance.get(`/pricings?filters[product][id][$eq]=${productId}&populate=*`);
    return normalizePricing(response);
  } catch (error) {
    console.error('Error fetching product pricing:', error);
    return [];
  }
};