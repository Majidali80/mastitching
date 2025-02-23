import React, { useState } from 'react';
import Image from 'next/image';
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa';

interface ImageZoomProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ imageUrl, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => prev + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(1, prev - 0.1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          Close
        </button>
        <Image
          src={imageUrl}
          alt="Zoomed Image"
          width={800}
          height={800}
          className="object-contain"
          style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s' }}
        />
        <div className="absolute bottom-2 left-2 flex space-x-2">
          <button
            className="bg-white text-black p-2 rounded"
            onClick={handleZoomIn}
          >
            <FaSearchPlus size={24} />
          </button>
          <button
            className="bg-white text-black p-2 rounded"
            onClick={handleZoomOut}
          >
            <FaSearchMinus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageZoom; 