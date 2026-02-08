import { BusSeatMap } from "./BusSeatMap.jsx";
import { MapPin, Clock, X } from "lucide-react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export const BusDetail = ({ productData }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleContinue = () => {
    navigate(`/booking/${productData.id}`, {
      state: {
        seat: selectedSeat,
        product: productData,
      },
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Product Header - Paling Atas */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {productData.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {productData.rating} ({productData.reviews} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {productData.location}
                </span>
                <span className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{productData.capacity}</span>
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-600">
                Rp {productData.price.toLocaleString('id-ID')}
              </div>
              <div className="text-sm text-gray-600 mb-3">{productData.priceUnit}</div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
              >
                Pilih Kursi
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Single Panel */}
        <div className="space-y-6">
          {/* Panel Kiri */}
          <div className="space-y-6">
            {/* Route Journey Section - Atas */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Rute Perjalanan</h2>

              <div className="space-y-4">
                {/* Departure */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-red-700"></div>
                    <div className="w-0.5 h-full bg-gray-300 min-h-[60px]"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {productData.departureTime}
                      </span>
                      <span className="text-sm text-gray-500">
                        {productData.departureDate}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {productData.departureLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Travel Duration */}
                <div className="flex gap-4 -my-2">
                  <div className="w-3"></div>
                  <div className="bg-gray-50 px-3 py-1.5 rounded-full inline-flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-600 font-medium">
                      {productData.travelDuration}
                    </span>
                  </div>
                </div>

                {/* Arrival */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-600 border-2 border-green-700"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {productData.arrivalTime}
                      </span>
                      <span className="text-sm text-gray-500">
                        {productData.arrivalDate}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {productData.arrivalLocation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information - Bawah */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-red-600">ℹ️</span>
                Kamu Harus Tau, nih!
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🎫</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pt-1.5">
                    E-tiket akan tersedia di halaman Your Orders dan dikirim ke emailmu setelah pembayaran selesai.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🎟️</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pt-1.5">
                    Sebelum naik, tunjukkan e-tiket ke petugas bus/travel untuk ditukar dengan tiket fisik.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🪪</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pt-1.5">
                    Siapkan kartu identitas yang berlaku. Petugas bus/travel mungkin memerlukannya untuk memverifikasi penumpang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup untuk Seat Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Pilih Kursi</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <BusSeatMap
                seats={productData.initialSeats}
                selectedSeat={selectedSeat}
                onSelectSeat={setSelectedSeat}
              />
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                disabled={!selectedSeat}
                className={`
            px-6 py-2 rounded-lg font-semibold text-white
            transition-all
            ${selectedSeat
                  ? "bg-[#DC2626] hover:bg-red-700"
                  : "bg-gray-300 cursor-not-allowed"
                }
          `}
                onClick={handleContinue}
              >
                Lanjut
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};