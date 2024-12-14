'use client'
import React, { useEffect, useState } from 'react';
import Features from '@/components/Home/Features';
import Services from '@/components/Home/Services';
import Howweworks from '@/components/Home/HowweWorks';
import Faq from '@/components/Home/Faq';
import Team from '@/components/Home/Team';
import Testimonial from '@/components/Home/Testimonial';
import BlogGrid from '@/components/Home/Blog';
import ContactSection from '@/components/Home/Contact';
import Hero from '@/components/Home/Hero';

const HomePage = () => {
  const [articles, setBlogs] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
    
    // Show popup after 2 seconds
    const popupTimer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 2000);

    // Clean up the timer
    return () => clearTimeout(popupTimer);
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}blogs`);
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("error fetching blogs", err)
    }
  };

  return (
    <div className="min-h-screen">
      {/* Consultation Offer Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-teal-600">Special Offer for New Families!</h2>
              <button 
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-base text-gray-700 mb-6">
              Get a <span className="font-bold text-teal-700">FREE First Consultation</span> for Two Months! 
              Unlock personalized child development insights and support.
            </p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll transition
                    block: 'start' // Align the top of the element with the top of the viewport
                  });
                  setIsPopupOpen(false);
                }}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Hero 
        title='Where little minds grow, and big dreams begin!'
        description="Introducing Chengannur's first-ever Child Development Center—a nurturing space where we work hand in hand, step by step, helping every child reach their milestones and beyond!"
        image='/kids.png'
      />
      <Features />
      <div className=' max-w-7xl mx-auto px-2 pt-8'>
        <div className='bg-gradient-to-r from-[#FCD767]/50 to-[#01B0AB]/50 p-6 rounded-full'>
          <h2 className='text-xl'>Why Choose Medorah</h2>
        </div>
      </div>
      <Services />
      <Howweworks />
      <Faq />
      <Team />
      <Testimonial />
      <h1 className="text-4xl font-bold mb-8 text-center mt-16">Articles</h1>
      {articles.length > 0 ? (<><BlogGrid articles={articles} /> </>) : ''}
      <ContactSection />
    </div>
  );
};

export default HomePage;