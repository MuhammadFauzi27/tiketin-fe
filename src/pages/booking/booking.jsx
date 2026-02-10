import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { BusSeatMap } from "../../components/busSeatMap.jsx";
import { BookingDetail } from "../../components/BookingDetail.jsx";
import { PassengerDetail } from "../../components/PassengerDetail.jsx";
import { PriceSummary } from "../../components/PriceSummary.jsx";

export const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { seat: initialSeat, product } = state || {};

  // State Management
  const [selectedSeat, setSelectedSeat] = useState(initialSeat);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreeTnc, setAgreeTnc] = useState(false);
  const [orderTitle, setOrderTitle] = useState('Tuan');
  const [passengerTitle, setPassengerTitle] = useState('Tuan');
  const [sameAsOrderer, setSameAsOrderer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showOrdererTitleDropdown, setShowOrdererTitleDropdown] = useState(false);
  const [showPassengerTitleDropdown, setShowPassengerTitleDropdown] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Muhammad Fauzi',
    phone: '82125413533',
    email: 'fauzym02@gmail.com',
    passengerName: '',
    birthDate: ''
  });

  // Handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSameAsOrderer = (checked) => {
    setSameAsOrderer(checked);
    if (checked) {
      setFormData({
        ...formData,
        passengerName: formData.name
      });
      setPassengerTitle(orderTitle);
    } else {
      setFormData({
        ...formData,
        passengerName: ''
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handlePayment = () => {
    if (!agreeTnc) return;

    // Generate a booking ID (you can replace this with your own logic)
    const bookingId = `BKG${Date.now()}`;

    // Navigate to payment page with booking data
    navigate(`/payment/${bookingId}`, {
      state: {
        bookingId,
        seat: selectedSeat,
        form: formData,
        orderTitle,
        passengerTitle,
        product,
        subtotal: product.price,
        total: product.price
      }
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Data tidak ditemukan</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#DC2626] text-white rounded-lg hover:bg-red-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const subtotal = product.price;
  const tax = 0; // Termasuk dalam harga
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-12 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Panel - Forms */}
          <div className="lg:col-span-2 space-y-5">
            {/* Detail Pemesan Section */}
            <BookingDetail
              orderTitle={orderTitle}
              setOrderTitle={setOrderTitle}
              showOrdererTitleDropdown={showOrdererTitleDropdown}
              setShowOrdererTitleDropdown={setShowOrdererTitleDropdown}
              formData={formData}
              handleInputChange={handleInputChange}
              sameAsOrderer={sameAsOrderer}
              setPassengerTitle={setPassengerTitle}
            />

            {/* Detail Penumpang Section */}
            <PassengerDetail
              product={product}
              selectedSeat={selectedSeat}
              handleOpenModal={handleOpenModal}
              sameAsOrderer={sameAsOrderer}
              handleSameAsOrderer={handleSameAsOrderer}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              passengerTitle={passengerTitle}
              setPassengerTitle={setPassengerTitle}
              showPassengerTitleDropdown={showPassengerTitleDropdown}
              setShowPassengerTitleDropdown={setShowPassengerTitleDropdown}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>

          {/* Right Panel - Price Summary */}
          <div className="lg:col-span-1">
            <PriceSummary
              subtotal={subtotal}
              total={total}
              agreeTnc={agreeTnc}
              setAgreeTnc={setAgreeTnc}
              handlePayment={handlePayment}
            />
          </div>
        </div>
      </div>

      {/* Modal Popup untuk Seat View Only */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Lihat Kursi</h2>
                <p className="text-sm text-gray-500 mt-1">Kursi yang kamu pilih: #{selectedSeat}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <BusSeatMap
                seats={product.initialSeats}
                selectedSeat={selectedSeat}
                onSelectSeat={() => {}} // Disabled interaction
                viewOnly={true}
              />
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <div className="text-sm">
                <span className="text-gray-700">
                  Kursi kamu: <span className="font-bold text-[#DC2626]">#{selectedSeat}</span>
                </span>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-[#DC2626] hover:bg-red-700 font-semibold text-white transition-all hover:shadow-lg"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};