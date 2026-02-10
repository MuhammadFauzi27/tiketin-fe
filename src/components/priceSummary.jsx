import React from 'react';

export const PriceSummary = ({
                               subtotal,
                               total,
                               agreeTnc,
                               setAgreeTnc,
                               handlePayment
                             }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:sticky lg:top-20">
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
  );
};