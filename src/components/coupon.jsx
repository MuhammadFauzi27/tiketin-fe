import { useState } from "react";
import { TicketPercent, Check, X } from "lucide-react";

export const Coupon = ({
                         coupons = [],
                         selectedCoupon,
                         onSelect,
                         onApplyVoucher,
                       }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");

  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) return;

    if (onApplyVoucher) {
      onApplyVoucher(voucherCode);
    }

    setVoucherCode("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl border p-4 space-y-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <TicketPercent className="w-5 h-5 text-red-600" />
          Pilih Kupon / Voucher
        </h3>

        {/* Tombol Input Voucher */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full p-3 rounded-lg border border-dashed border-red-600 text-red-600 hover:bg-red-50 transition text-sm font-medium"
        >
          Punya kode voucher? Masukkan di sini
        </button>

        {coupons.length === 0 ? (
          <p className="text-sm text-gray-500">
            Tidak ada kupon tersedia
          </p>
        ) : (
          <div className="space-y-3">
            {coupons.map((coupon) => {
              const isSelected = selectedCoupon?.id === coupon.id;

              return (
                <button
                  key={coupon.id}
                  onClick={() => onSelect(coupon)}
                  className={`w-full text-left p-4 rounded-lg border transition
                    ${
                    isSelected
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {coupon.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {coupon.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Berlaku sampai {coupon.expiredAt}
                      </p>
                    </div>

                    {isSelected && (
                      <Check className="w-5 h-5 text-red-600" />
                    )}
                  </div>

                  <div className="mt-2 text-sm font-medium text-red-600">
                    Hemat Rp{coupon.discount.toLocaleString("id-ID")}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ================== MODAL ================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 relative shadow-xl">

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-lg font-semibold text-gray-800">
              Masukkan Kode Voucher
            </h4>

            <input
              type="text"
              placeholder="Contoh: HEMAT50"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="w-full border rounded-lg px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-red-600
                         focus:border-red-600"
            />

            <button
              onClick={handleApplyVoucher}
              className="w-full bg-red-600 text-white py-2 rounded-lg
                         hover:bg-red-700 transition font-medium"
            >
              Gunakan Voucher
            </button>
          </div>
        </div>
      )}
    </>
  );
};
