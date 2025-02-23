import React from 'react';

interface WhatsAppPopupProps {
  onClose: () => void;
  whatsappNumber: string;
  predefinedMessage: string;
}

const WhatsAppPopup: React.FC<WhatsAppPopupProps> = ({ onClose, whatsappNumber, predefinedMessage }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Chat with us on WhatsApp</h2>
        <p>If you have any questions about the product, feel free to reach out!</p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(predefinedMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block"
        >
          Start Chat
        </a>
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WhatsAppPopup; 