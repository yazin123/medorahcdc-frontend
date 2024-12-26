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
  <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 max-w-[300px]">
    <div className="flex justify-between items-start mb-3">
      <h2 className="text-xl font-bold text-teal-600">Special Offer!</h2>
      <button 
        onClick={() => setIsPopupOpen(false)}
        className="text-gray-400 hover:text-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <p className="text-sm text-gray-700 mb-4">
      FREE First Consultation for Two Months! Connect with us now.
    </p>
    <div className="flex space-x-3">
      <a 
        href="tel:+918848607827" 
        className="flex items-center justify-center gap-2 px-3 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call
      </a>
      <a 
        href="https://wa.me/918848607827" 
        target="_blank"
        className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Chat
      </a>
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
    
      {articles.length > 0 ? (<>   <h1 className="text-4xl font-bold mb-8 text-center mt-16">Articles</h1> <BlogGrid articles={articles} /> </>) : ''}
      <ContactSection />
    </div>
  );
};

export default HomePage;
