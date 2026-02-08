import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { BusSeatMap } from "../components/BusSeatMap.jsx";

export const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { seat: initialSeat, product } = state || {};

  // State Management
  const [selectedSeat, setSelectedSeat] = useState(initialSeat);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedSeat, setTempSelectedSeat] = useState(null);
  const [agreeTnc, setAgreeTnc] = useState(false);
  const [orderTitle, setOrderTitle] = useState('Tuan');
  const [passengerTitle, setPassengerTitle] = useState('Tuan');
  const [sameAsOrderer, setSameAsOrderer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const [formData, setFormData] = useState({
    name: 'Muhammad Fauzi',
    phone: '+62 82125413533',
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
    setTempSelectedSeat(selectedSeat);
    setIsModalOpen(true);
  };

  const handleConfirmSeat = () => {
    if (tempSelectedSeat) {
      setSelectedSeat(tempSelectedSeat);
      setIsModalOpen(false);
    }
  };

  const handlePayment = () => {
    if (!agreeTnc) return;
    // Navigate to payment page
    console.log('Proceed to payment with:', {
      seat: selectedSeat,
      formData,
      orderTitle,
      passengerTitle,
      product
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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Detail Pemesan</h2>
              <p className="text-sm text-gray-500 mb-6">
                Detail kontak ini akan digunakan untuk pengiriman e-tiket dan keperluan reschedule.
              </p>

              {/* Title Tabs */}
              <div className="flex gap-6 mb-6 border-b-2 border-gray-200">
                {['Tuan', 'Nyonya', 'Nona'].map((title) => (
                  <button
                    key={title}
                    onClick={() => setOrderTitle(title)}
                    className={`text-[15px] pb-2 px-1 -mb-0.5 border-b-2 transition-all ${
                      orderTitle === title
                        ? 'text-[#DC2626] border-[#DC2626] font-medium'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>

              {/* Name Input */}
              <div className="mb-5">
                <label className="block text-[13px] text-gray-600 mb-2 font-medium">
                  Nama Lengkap Sesuai KTP/Paspor/SIM
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[15px] bg-gray-50 focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all"
                />
              </div>

              {/* Phone Input */}
              <div className="mb-5">
                <label className="block text-[13px] text-gray-600 mb-2 font-medium">
                  Nomor Ponsel
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 min-w-[80px]">
                    <span className="text-xl">🇮🇩</span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
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

            {/* Detail Penumpang Section */}
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
                  Ubah kursi
                </button>
              </div>

              {/* Collapsible Section */}
              {isExpanded && (
                <>
                  {/* Info Penumpang */}
                  <h4 className="text-base font-semibold text-gray-800 mb-4">Info Penumpang</h4>

                  {/* Passenger Title Tabs */}
                  <div className="flex gap-6 mb-6 border-b-2 border-gray-200">
                    {['Tuan', 'Nyonya', 'Nona'].map((title) => (
                      <button
                        key={title}
                        onClick={() => !sameAsOrderer && setPassengerTitle(title)}
                        disabled={sameAsOrderer}
                        className={`text-[15px] pb-2 px-1 -mb-0.5 border-b-2 transition-all ${
                          passengerTitle === title
                            ? 'text-[#DC2626] border-[#DC2626] font-medium'
                            : 'text-gray-500 border-transparent hover:text-gray-700'
                        } ${sameAsOrderer ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {title}
                      </button>
                    ))}
                  </div>

                  {/* Passenger Name */}
                  <div className="mb-5">
                    <label className="block text-[13px] text-gray-600 mb-2 font-medium">
                      Nama Lengkap Sesuai KTP/Paspor
                    </label>
                    <input
                      type="text"
                      name="passengerName"
                      value={formData.passengerName}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                      disabled={sameAsOrderer}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-[15px] bg-gray-50 focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all ${
                        sameAsOrderer ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Sesuai KTP/Paspor (tanpa tanda baca dan gelar)
                    </p>
                  </div>

                  {/* Birth Date */}
                  <div className="mb-5">
                    <label className="block text-[13px] text-gray-600 mb-2 font-medium">
                      Tanggal Lahir
                    </label>
                    <select
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg text-[15px] bg-gray-50 focus:outline-none focus:border-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#DC2626]/10 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234a5568' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center'
                      }}
                    >
                      <option value="">Pilih tanggal lahir</option>
                      <option value="1990-01-01">1 Januari 1990</option>
                      <option value="1991-02-15">15 Februari 1991</option>
                      <option value="1992-03-20">20 Maret 1992</option>
                      <option value="1993-05-10">10 Mei 1993</option>
                      <option value="1994-08-25">25 Agustus 1994</option>
                    </select>
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
          </div>

          {/* Right Panel - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:sticky lg:top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Ringkasan Harga
              </h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-1">
                    Subtotal (1 penumpang)
                  </span>
                  <span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                  <span>Pajak & biaya lainnya</span>
                  <span className="text-green-600 font-medium">Termasuk</span>
                </div>

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total bayar</span>
                  <span className="text-xl font-bold text-[#DC2626]">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-3 mb-4 text-xs text-gray-600 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreeTnc}
                  onChange={(e) => setAgreeTnc(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#DC2626] border-gray-300 rounded focus:ring-[#DC2626] cursor-pointer"
                />
                <span className="group-hover:text-gray-800 transition-colors">
                  Saya menyetujui{' '}
                  <a href="#" className="text-[#DC2626] hover:underline font-medium">
                    Syarat & Ketentuan
                  </a>{' '}
                  yang berlaku.
                </span>
              </label>

              {/* CTA */}
              <button
                disabled={!agreeTnc}
                onClick={handlePayment}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all transform ${
                  agreeTnc
                    ? 'bg-[#DC2626] hover:bg-red-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Lanjut ke pembayaran
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Pembayaran aman dan terenkripsi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup untuk Seat Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Pilih Kursi</h2>
                <p className="text-sm text-gray-500 mt-1">Pilih kursi yang tersedia untuk perjalananmu</p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTempSelectedSeat(selectedSeat);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <BusSeatMap
                seats={product.initialSeats}
                selectedSeat={tempSelectedSeat}
                onSelectSeat={setTempSelectedSeat}
              />
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <div className="text-sm">
                {tempSelectedSeat ? (
                  <span className="text-gray-700">
                    Kursi terpilih: <span className="font-bold text-[#DC2626]">#{tempSelectedSeat}</span>
                  </span>
                ) : (
                  <span className="text-gray-500">Belum ada kursi yang dipilih</span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setTempSelectedSeat(selectedSeat);
                  }}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                >
                  Batal
                </button>

                <button
                  disabled={!tempSelectedSeat}
                  className={`px-6 py-2 rounded-lg font-semibold text-white transition-all ${
                    tempSelectedSeat
                      ? "bg-[#DC2626] hover:bg-red-700 hover:shadow-lg"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleConfirmSeat}
                >
                  Konfirmasi Kursi
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};