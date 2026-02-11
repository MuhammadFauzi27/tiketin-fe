import React from 'react';
import { ChevronDown } from "lucide-react";

export const PassengerDetail = ({
                                  product,
                                  selectedSeat,
                                  handleOpenModal,
                                  sameAsOrderer,
                                  handleSameAsOrderer,
                                  isExpanded,
                                  setIsExpanded,
                                  passengerTitle,
                                  setPassengerTitle,
                                  showPassengerTitleDropdown,
                                  setShowPassengerTitleDropdown,
                                  formData,
                                  handleInputChange
                                }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Detail Penumpang</h2>
      <p className="text-sm text-gray-500 mb-6">
        Pastikan untuk mengisi detail penumpang dengan benar agar perjalananmu lancar.
      </p>

      {/* Passenger Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-semibold text-[#DC2626]">Penumpang 1</h3>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-gray-500">Sama dengan pemesan</span>
          <button
            onClick={() => handleSameAsOrderer(!sameAsOrderer)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              sameAsOrderer ? 'bg-[#DC2626]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                sameAsOrderer ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Seat Info */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg mb-5 border border-red-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </div>
          <div>
            <div className="text-[13px] text-gray-500">{product.name}</div>
            <div className="text-[15px] font-semibold text-gray-800">
              Kursi {selectedSeat || '-'}
            </div>
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="text-[#DC2626] text-sm font-medium hover:underline hover:text-red-700 transition-colors"
        >
          Lihat kursi
        </button>
      </div>

      {/* Collapsible Section */}
      {isExpanded && (
        <>
          {/* Info Penumpang */}
          <h4 className="text-base font-semibold text-gray-800 mb-4">Info Penumpang</h4>

          {/* Passenger Name with Title Dropdown */}
          <div className="mb-5">
            <label className="block text-[13px] text-gray-600 mb-2 font-medium">
              Nama Lengkap Sesuai KTP/Paspor
            </label>
            <div className="flex gap-2">
              {/* Passenger Title Dropdown */}
              <div className="relative">
                <button
                  onClick={() => !sameAsOrderer && setShowPassengerTitleDropdown(!showPassengerTitleDropdown)}
                  disabled={sameAsOrderer}
                  className={`px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white hover:border-[#DC2626] focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all flex items-center gap-2 min-w-[100px] ${
                    sameAsOrderer ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="text-[15px] text-gray-700">{passengerTitle}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showPassengerTitleDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showPassengerTitleDropdown && !sameAsOrderer && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowPassengerTitleDropdown(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                      {['Tuan', 'Nyonya', 'Nona'].map((title) => (
                        <button
                          key={title}
                          onClick={() => {
                            setPassengerTitle(title);
                            setShowPassengerTitleDropdown(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-[15px] hover:bg-red-50 transition-colors ${
                            passengerTitle === title ? 'bg-red-50 text-[#DC2626] font-medium' : 'text-gray-700'
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
                name="passengerName"
                value={formData.passengerName}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                disabled={sameAsOrderer}
                className={`flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[15px] bg-gray-50 focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all ${
                  sameAsOrderer ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Sesuai KTP/Paspor (tanpa tanda baca dan gelar)
            </p>
          </div>
        </>
      )}

      {/* Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 text-[#DC2626] text-sm font-medium py-3 hover:bg-red-50 rounded-lg transition-colors"
      >
        <ChevronDown className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        <span>{isExpanded ? 'Sembunyikan' : 'Tampilkan'} Detail</span>
      </button>
    </div>
  );
};