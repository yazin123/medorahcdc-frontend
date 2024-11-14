import Navbar from "@/components/Navbar";
import ClientComponent from "./ClientComponent";
import "./globals.css";
import { Poppins } from 'next/font/google';
import Footer from "@/components/Footer";
import React from 'react';


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
export const metadata = {
  title: 'Medorah CDC',
  description: "Where little minds grow, and big Dreams begin",
  keywords: 'Child development Centre, Therapy, Speech Therapy, Occupational Therapy, Special Education, Therapy Centre, Specially abled',
  openGraph: {
    title: 'Medorah CDC',
    description: 'Where little minds grow, and big Dreams begin',
    url: 'https://medorahcdc.in/',
    images: [
      {
        url: 'https://medorahcdc.in/footer-logo.png',
        alt: 'Medorah CDC',
      },
    ],
    siteName: 'Medorah CDC',
  },
  icons: {
    icon: '/footer-logo.png',
    shortcut: '/footer-logo.png',
    apple: '/footer-logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/footer-logo.png',
    },
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <ClientComponent />
      <body className={`${poppins.variable} font-poppins`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}