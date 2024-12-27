import Navbar from "@/components/Navbar";
import ClientComponent from "./ClientComponent";
import "./globals.css";
import { Poppins } from 'next/font/google';
import Footer from "@/components/Footer";
import React from 'react';
import Script from 'next/script';  // Add this import
import ContactButtons from "@/components/ContactButtons";

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
    url: 'https://medorahcdc.com/',
    images: [
      {
        url: 'https://medorahcdc.com/footer-logo.png',
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0WBY0M8XKN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0WBY0M8XKN');
          `}
        </Script>
      </head>
      <ClientComponent />
      <body className={`${poppins.variable} font-poppins`}>
        <Navbar />
        <ContactButtons/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
