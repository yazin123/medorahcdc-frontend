'use client'
import React, { useEffect, useState } from 'react';
import BlogGrid from '@/components/Home/Blog'
import Faq from '@/components/Home/Faq'
import Hero from '@/components/Home/Hero'

const page = () => {
  const [articles, setBlogs] = useState([]);
  useEffect(() => {
    fetchBlogs();

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
    <div>
        <Hero title='Blogs'/>
        {articles.length > 0 ? (<><BlogGrid articles={articles} /> </>) : ''}
        <Faq/>

    </div>
  )
}

export default page
