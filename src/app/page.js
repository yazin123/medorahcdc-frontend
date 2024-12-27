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
