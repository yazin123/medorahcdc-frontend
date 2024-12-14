import React, { useRef, useState, useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;



  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {

      const response = await fetch(`${base_url}testimonials`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.log('Error loading testimonials. Please try again later.');
    }
  };


  return (
   <>
   {testimonials.length >0?<>
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What They Have to Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial,index) => (
            <div 
              key={index}
              className="relative p-6 rounded-lg bg-gradient-to-b from-yellow-50 to-teal-50 shadow-sm" data-aos="fade-right" data-aos-delay={`${index}00`}
            >
              <FaQuoteLeft className="text-2xl text-gray-400 mb-4" />
              
              <p className="text-gray-600 mb-6">
                {testimonial.content}
              </p>
              
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                     src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${testimonial.image}`}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.position}
                   <span className='italic'> {testimonial.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </>:''}
   </>
  );
};

export default Testimonial;