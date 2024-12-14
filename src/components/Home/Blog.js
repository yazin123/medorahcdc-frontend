'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';

const BlogGrid = ({ articles }) => {
  
  return (
    <div className="max-w-7xl mx-auto px-4 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-11">
        {articles?.map((article) => (
          <Link
            href={`/blogs/${article.slug}`}
            key={article.slug}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${article.image[0]}`}
                alt={article.title}
                width={800}
                height={800}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-white text-lg font-semibold group-hover:underline mb-2">
                {article.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-950 text-white rounded-full hover:bg-blue-900 transition-colors duration-300">
          See More
          <HiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BlogGrid;