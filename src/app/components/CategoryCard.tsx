'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    attributes: {
      Name: string;
      Photo?: {
        data: {
          attributes: {
            url: string;
            alternativeText?: string;
          };
        }[];
      };
      products?: {
        data: {
          attributes: {
            Name: string;
          };
        }[];
      };
    };
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  if (!category || !category.attributes) {
    console.error('Invalid category data:', category);
    return null;
  }

  const photoData = category.attributes.Photo?.data || [];
  const strapiHost = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '') || 'https://strapi-graphichouse-v1-iwpx.onrender.com';
  const rawUrl = photoData[0]?.attributes?.url;
  const imageUrl = rawUrl
    ? rawUrl.startsWith('http')
      ? rawUrl
      : `${strapiHost}${rawUrl}`
    : '/logo.jpg';
  const productNames = category.attributes.products?.data?.map((product) => product.attributes?.Name) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-gradient-to-b from-gray-950 to-black border border-yellow-400/30 shadow-[0_18px_45px_rgba(250,204,21,0.12)] rounded-2xl overflow-hidden cursor-pointer group text-center"
    >
      <Link href={`/category/${category.id}/products`} className="block">
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={photoData[0]?.attributes?.alternativeText || category.attributes.Name || 'Category Image'}
            layout="fill"
            objectFit="cover"
            className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-yellow-400">{category.attributes.Name || 'Unnamed Category'}</h3>
          <div className="text-sm text-gray-300">
            {productNames.length > 0 ? (
              <span className="text-yellow-300 font-semibold">Products Available</span>
            ) : (
              <span className="text-red-300 font-semibold">No Products Available</span>
            )}
          </div>
          <div className="inline-flex items-center justify-center text-yellow-300 transition duration-300 cursor-pointer group-hover:text-yellow-200">
            View Products
            <ChevronRight className="ml-1 w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
