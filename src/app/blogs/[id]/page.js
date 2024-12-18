'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { use } from 'react';

const BlogPost = ({ params }) => {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}blogs/slug/${resolvedParams.id}`);
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                const data = await response.json();
                setBlog(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (resolvedParams?.id) {
            fetchBlog();
        }
    }, [resolvedParams?.id]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
                <div className="animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
                <div className="text-center text-red-600">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <div>{error}</div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            {/* Hero Section */}
            <div className="relative h-72 mt-28 mb-8 overflow-hidden ">
                <div className="absolute inset-0 ">
                    {blog.image && blog.image[0] && (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${blog.image[0]}`}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FCD767]/60 to-[#01B0AB]/60"></div>
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 max-w-4xl mx-auto ">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {blog.title}
                    </h1>
                    <p className="text-white/90">- {blog.author}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className=" max-w-4xl mx-auto px-4 py-8 mt-16 space-y-6">
                <div 
                    className="prose max-w-none prose-lg prose-gray myblog"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags Section */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                        {blog.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Additional Images Grid */}
                {blog.image && blog.image.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                        {blog.image.slice(1).map((img, i) => (
                            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${img}`}
                                    alt={`Blog image ${i + 1}`}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPost;
