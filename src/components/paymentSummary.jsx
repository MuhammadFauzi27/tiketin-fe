import { useMemo, useState } from "react";
import { Coupon } from "./Coupon";

const generateOrderId = () => {
  return Math.floor(100000000 + Math.random() * 900000000);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Des"];

  return `${days[date.getDay()]}, ${String(date.getDate()).padStart(2, "0")} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const PaymentSummary = ({
                                 orderId,
                                 route,
                                 date,
                                 time = "-",
                                 total = 0,
                                 selectedMethod,
                                 onPayment,
                                 coupons = [],
                               }) => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const generatedOrderId = useMemo(() => generateOrderId(), []);
  const displayOrderId = orderId || generatedOrderId;

  const displayRoute = route || "Pasteur → Kuningan (Jakarta)";
  const displayDate = formatDate(date);

  const discount = selectedCoupon?.discount || 0;
  const finalTotal = Math.max(total - discount, 0);

  const isPaymentEnabled = selectedMethod !== null;

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      {/* Order ID */}
      <div className="text-sm text-gray-500">
        Order ID: <span className="font-medium text-gray-800">{displayOrderId}</span>
      </div>

      {/* Route */}
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="font-semibold text-gray-800">{displayRoute}</p>
        <p className="text-sm text-gray-500">
          {displayDate} • {time}
        </p>
      </div>

      {/* Promo */}
      <button
        onClick={() => setShowCoupon(!showCoupon)}
        className="w-full flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2 text-[#DC2626] font-medium text-sm">
          <span className="text-lg">%</span>
          <span>
            {selectedCoupon
              ? `${selectedCoupon.title} (-Rp${formatCurrency(selectedCoupon.discount)})`
              : "Lihat promo/voucher"}
          </span>
        </div>
        <input type="radio" checked={!!selectedCoupon} readOnly className="accent-[#DC2626]" />
      </button>

      {/* Coupon Panel */}
      {showCoupon && (
        <Coupon
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          onSelect={(coupon) => {
            setSelectedCoupon(coupon);
            setShowCoupon(false);
          }}
          onApplyVoucher={(code) => {
            if (code === 'HEMAT50') {
              setSelectedCoupon({
                discont: 50000
              })
            }
          }}
        />
      )}

      {/* Point */}
      <div className="flex items-center justify-between border rounded-lg p-3">
        <div>
          <p className="font-medium text-gray-800 text-sm">Pakai 0 poin</p>
          <p className="text-xs text-gray-500">Poin saat ini: 0</p>
        </div>
        <input type="radio" disabled className="accent-[#DC2626]" />
      </div>

      {/* Total */}
      <div className="space-y-1 pt-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total</span>
          <span>Rp {formatCurrency(total)}</span>
        </div>

        {selectedCoupon && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Diskon</span>
            <span>- Rp {formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between font-semibold text-gray-900">
          <span>Total Pembayaran</span>
          <span>Rp {formatCurrency(finalTotal)}</span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => onPayment({ coupon: selectedCoupon, total: finalTotal })}
        disabled={!isPaymentEnabled}
        className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
          isPaymentEnabled
            ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isPaymentEnabled
          ? `Bayar dengan ${selectedMethod.name}`
          : "Belum Pilih Metode Pembayaran"}
      </button>

      {/* Agreement */}
      <p className="text-xs text-gray-500 text-center">
        Dengan menekan tombol bayar, kamu menyetujui{" "}
        <span className="text-[#DC2626] cursor-pointer hover:underline">
          Syarat & Ketentuan
        </span>{" "}
        dan{" "}
        <span className="text-[#DC2626] cursor-pointer hover:underline">
          Kebijakan Privasi
        </span>
      </p>
    </div>
  );
};
