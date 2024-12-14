import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Services = () => {
  const scrollContainerRef = useRef(null);
  const [services, setServices] = useState([]);
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {

      const response = await fetch(`${base_url}services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      console.log("services are :", data)
      setServices(data);
    } catch (error) {
      console.log('Error loading services. Please try again later.');
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12 md:flex justify-between">
        <h1 className="text-3xl md:text-4xl font-bold mb-3" data-aos="fade-right" >
          Discover the Path <br /> to Growth and Potential

        </h1>
        <p className="text-gray-600 md:w-1/2 mt-5" data-aos="fade-up" >
          Our tailored therapy sessions empower children to thrive, focusing on skill development across
          language, motor, and social-emotional areas. Let us help guide your child on their journey to
          reach new milestones.
        </p>
      </div>

      <div className="md:flex gap-6">
        <div className="flex mb-6 items-center">
          <div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Previous"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Next"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="ml-4">
              <span className="text-sm text-gray-500">See More</span>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {services.map((service, index) => (
            <Link href={`/services/${slugify(service.title)}`}
              key={index}
              className="flex-none w-full   max-w-[330px]" data-aos="fade-up" data-aos-delay={`${index}00`}
            >
              <div className="bg-white  overflow-hidden ">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${service.imageUrl}`}
                    alt={service.title}
                    width={500}
                    height={500}
                    crossOrigin="anonymous"
                    className="w-full h-80 object-cover rounded-3xl"
                  />
                </div>
                <div className="pl-2 pr-2">
                  <h3 className="text-xl font-semibold mb-2">{service.title} </h3>
                  {/* <p className="text-gray-600 text-justify">{service.description} </p> */}

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;