import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const ContactButtons = ({ phoneNumber = '+918848607827' }) => {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <button
        onClick={handleCall}
        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </button>
      
      <button
        onClick={handleWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Message us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ContactButtons;
