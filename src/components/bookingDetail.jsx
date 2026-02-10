import React from 'react';
import { ChevronDown } from "lucide-react";

export const BookingDetail = ({
                                orderTitle,
                                setOrderTitle,
                                showOrdererTitleDropdown,
                                setShowOrdererTitleDropdown,
                                formData,
                                handleInputChange,
                                sameAsOrderer,
                                setPassengerTitle
                              }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Detail Pemesan</h2>
      <p className="text-sm text-gray-500 mb-6">
        Detail kontak ini akan digunakan untuk pengiriman e-tiket dan keperluan reschedule.
      </p>

      {/* Name Input with Title Dropdown */}
      <div className="mb-5">
        <label className="block text-[13px] text-gray-600 mb-2 font-medium">
          Nama Lengkap Sesuai KTP/Paspor/SIM
        </label>
        <div className="flex gap-2">
          {/* Title Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowOrdererTitleDropdown(!showOrdererTitleDropdown)}
              className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white hover:border-[#DC2626] focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all flex items-center gap-2 min-w-[100px]"
            >
              <span className="text-[15px] text-gray-700">{orderTitle}</span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showOrdererTitleDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showOrdererTitleDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowOrdererTitleDropdown(false)}
                />
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                  {['Tuan', 'Nyonya', 'Nona'].map((title) => (
                    <button
                      key={title}
                      onClick={() => {
                        setOrderTitle(title);
                        setShowOrdererTitleDropdown(false);
                        if (sameAsOrderer) {
                          setPassengerTitle(title);
                        }
                      }}
                      className={`w-full px-4 py-2.5 text-left text-[15px] hover:bg-red-50 transition-colors ${
                        orderTitle === title ? 'bg-red-50 text-[#DC2626] font-medium' : 'text-gray-700'
                      }`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[15px] bg-gray-50 focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div className="mb-5">
        <label className="block text-[13px] text-gray-600 mb-2 font-medium">
          Nomor Ponsel
        </label>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 min-w-[80px]">
            <span className="text-[15px] text-gray-700 font-medium">+62</span>
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Contoh: 82125413533"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[15px] bg-gray-50 focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="mb-0">
        <label className="block text-[13px] text-gray-600 mb-2 font-medium">
          Alamat Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[15px] bg-gray-50 focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all"
        />
        <p className="text-[13px] text-gray-500 mt-2">
          Kamu bisa mengubah email lewat profilmu di menu Akun.
        </p>
      </div>
    </div>
  );
};