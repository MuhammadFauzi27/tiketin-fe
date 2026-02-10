import React, { useState } from 'react';
import { productData } from "../../services/data/busData.js";
import { TermAndCondition } from "../../components/termAndCondition.jsx";
import { BusDetail } from "../../components/busDetail.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState('detail');
  const [currentImage, setCurrentImage] = useState(0);

  const images = productData.images || [];

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Hero Image */}
        <div className="relative w-full h-96">
          {images.length > 0 && (
            <img
              src={images[currentImage]}
              alt={productData.name}
              className="w-full h-full object-cover"
            />
          )}

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImage
                    ? "bg-red-600"
                    : "bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b bg-white">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('detail')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'detail'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-red-600 hover:border-red-300'
              }`}
            >
              Detail
            </button>

            <button
              onClick={() => setActiveTab('syarat')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'syarat'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-red-600 hover:border-red-300'
              }`}
            >
              Syarat & Ketentuan
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-slate-100 rounded-lg shadow-sm">
        <div className="p-6">
          {activeTab === 'detail' && <BusDetail productData={productData} />}
          {activeTab === 'syarat' && <TermAndCondition product={productData} />}
        </div>
      </div>
    </div>
  );
};
