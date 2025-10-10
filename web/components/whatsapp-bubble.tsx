// src/components/whatsapp-bubble.tsx (unchanged)
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppBubbleProps {
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppBubble: React.FC<WhatsAppBubbleProps> = ({
  phoneNumber = '+1234567890',
  message = 'Hello! I\'m interested in the Parish Management System.'
}) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 group"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us on WhatsApp
      </span>
    </button>
  );
};