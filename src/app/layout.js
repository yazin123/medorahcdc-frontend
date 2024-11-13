'use client'
import Navbar from "@/components/Navbar";
import ClientComponent from "./ClientComponent";
import "./globals.css";
import { Poppins } from 'next/font/google';
import Footer from "@/components/Footer";
import React, { useEffect, useState } from 'react';
import AdminNavbar from "@/components/AdminNavbar";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem('adminToken');
    setIsAdmin(!!admin);
  }, []);

  return (
    <html lang="en">
      <ClientComponent />
      <body className={`${poppins.variable} font-poppins`}>
        {isAdmin ? <AdminNavbar /> : <Navbar />}
        {children}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}