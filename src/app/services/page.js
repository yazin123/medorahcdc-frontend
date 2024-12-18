'use client'
import BlogGrid from '@/components/Home/Blog';
import Hero from '@/components/Home/Hero'
import Howweworks from '@/components/Home/HowweWorks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [articles, setBlogs] = useState([]);
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const base_urlimg = process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE;
    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };


    useEffect(() => {
        fetchServices();
         fetchBlogs();
    }, []);

    const fetchServices = async () => {
        try {

            const response = await fetch(`${base_url}services`);
            if (!response.ok) throw new Error('Failed to fetch services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.log('Error loading services. Please try again later.');
        }
    };

      const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}blogs`);
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {

      console.log("error fetching blogs", err)
    }
  };


    return (
        <div className="max-w-7xl mx-auto px-4 py-16 mt-[80vh] md:mt-0  ">
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-3" data-aos="fade-right">
                    Services
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className=" "
                        data-aos="fade-up"
                        data-aos-delay={`${index}00`}
                    >
                        <Link className="bg-white overflow-hidden " href={`/services/${slugify(service.title)}`} >
                            <div className="aspect-w-16 aspect-h-9 transition duration-300 hover:scale-105">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${service.imageUrl}`}
                                    alt={service.title}
                                    width={500}
                                    height={500}
                                    className="w-full h-72 object-cover rounded-3xl"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

const page = () => {
    return (
        <div>
            <Hero
                title='Where Every Challenge Sparks Opportunity and Every
                        Step Builds a Brighter Future.'
                description="Discover personalized support for your child's
                        development at our CDC. We offer expert assessments, tailored interventions, and ongoing
                        guidance to help your child thrive. Explore our services today and unlock your child’s full
                        potential!"
                image='/kid2.png'
            />
            <Services />
            <Howweworks />
{/*            
          <h1 className="text-4xl font-bold mb-8 text-center mt-16">Articles</h1> \
          <BlogGrid articles={articles} />  */}
        </div>
    )
}

export default page
