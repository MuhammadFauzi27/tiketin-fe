import React, { useState } from 'react';
import {productData} from "../services/data/busData.js";
import {TermAndCondition} from "../components/termAndCondition.jsx";
import {BusDetail} from "../components/busDetail.jsx";

export const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState('detail');

  return (
    <div className="space-y-6">
      {/* Hero Image Section with Navigation Bar - Menyatu dengan lebar yang sama */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Hero Image */}
        <div className="w-full">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Tabs Navigation - Langsung di bawah hero image */}
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

      {/* Product Info Section */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'detail' && <BusDetail productData={productData} />}
          {activeTab === 'syarat' && <TermAndCondition product={productData} />}
        </div>
      </div>
    </div>
  );
};