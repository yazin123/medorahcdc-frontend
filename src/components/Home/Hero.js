'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Hero = ({ title, description, image }) => {

     const handleScroll = () => {
    window.scrollBy({
      top: 500,  // Scrolls the page 500 pixels down
      behavior: 'smooth'  // Smooth scroll effect
    });
  };
    
    return (
        <div className={`flex-1 mt-20 ${image?'h-[90vh]':'h-[30vh]'} mb-20`}>
            <div className="md:h-full rounded-t-3xl bg-gradient-to-r from-[#FCD767] to-[#01B0AB]">
                <div className="h-full grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0 z-10">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" data-aos="fade-right" >
                                {title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-8" data-aos="fade-right" data-aos-delay="200">
                                {description}
                            </p>
                            {image ? (
                            <div className="space-x-4">
                                <button className="bg-blue-950 text-white px-6 py-3 rounded-full hover:bg-blue-900" data-aos="fade-right" data-aos-delay="400"  onClick={handleScroll} >
                                    Learn More
                                </button>
                                <Link href='/#contact' className="border border-blue-950 text-blue-950 px-6 py-3 rounded-full hover:bg-blue-900 hover:text-white" data-aos="fade-right" data-aos-delay="500">
                                    Contact us
                                </Link>
                            </div>
                            ):''}
                        </div>
                    </div>
                    {image ? (
                        <>
                            <div className="hidden md:block h-full">
                                <div className="h-full flex items-center justify-center p-8 relative ">
                                    <Image
                                        src={image}
                                        alt="Happy children"
                                        width={1000} height={1000}
                                        className=" h-5/6 w-auto object-cover md:absolute max-w-none right-0 bottom-0" data-aos="fade-up"
                                    />
                                </div>
                            </div>
                            <div className=" md:hidden  "> {/* Added height for mobile */}
                                <div className="h-full  flex items-center justify-center relative">
                                    <Image
                                        src={image}
                                        alt="Happy children"
                                        width={1000} height={1000}
                                        className="h-full w-full object-contain md:object-cover md:absolute md:max-w-none md:right-0 bottom-0" data-aos="fade-up"
                                    />
                                </div>
                            </div>
                        </>
                    ) : ''}
                </div>
            </div>
        </div>
    );
};

export default Hero;
