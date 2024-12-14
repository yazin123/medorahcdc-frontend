'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Handle clicks outside of navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle link clicks
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Image width={700} height={700} src="/image.png" alt="Logo" className="w-auto h-20 hidden md:block" />
            <Image width={700} height={700} src="/image.png" alt="Logo" className="w-auto h-14 md:hidden" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-teal-600">Home</Link>
            <Link href="/#about" className="text-gray-600 hover:text-teal-600">About</Link>
            <Link href="/services" className="text-gray-600 hover:text-teal-600">Services</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-teal-600">Contact</Link>
            <Link href="/gallery" className="text-gray-600 hover:text-teal-600">Gallery</Link>
            <Link href="/blogs" className="text-gray-600 hover:text-teal-600">Blogs</Link>
            <Link
              href='https://wa.me/+917994857990'
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-teal-600"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-teal-600">Home</Link>
            <Link href="/#about" className="block px-3 py-2 text-gray-600 hover:text-teal-600">About</Link>
            <Link href="/services" className="block px-3 py-2 text-gray-600 hover:text-teal-600">Services</Link>
            <Link href="/#contact" className="block px-3 py-2 text-gray-600 hover:text-teal-600">Contact</Link>
            <Link href="/gallery" className="block px-3 py-2 text-gray-600 hover:text-teal-600">Gallery</Link>
            <Link href="/blogs" className="block px-3 py-2  text-gray-600 hover:text-teal-600">Blogs</Link>
            <Link
              href='tel:+917994857990'
              className="w-full text-left  px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;