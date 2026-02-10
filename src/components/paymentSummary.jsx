import { useMemo } from "react";

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

  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

export const PaymentSummary = ({
                                 orderId,
                                 route,
                                 date,
                                 time = "-",
                                 total = 0,
                                 selectedMethod,
                                 onPayment
                               }) => {
  const generatedOrderId = useMemo(() => generateOrderId(), []);
  const displayOrderId = orderId || generatedOrderId;

  const displayRoute = route || "Pasteur → Kuningan (Jakarta)";
  const displayDate = formatDate(date);
  const displayTime = time;

  const isPaymentEnabled = selectedMethod !== null;

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      {/* Order ID */}
      <div className="text-sm text-gray-500">
        Order ID: <span className="font-medium text-gray-800">{displayOrderId}</span>
      </div>

      {/* Route */}
      <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">
            {displayRoute}
          </p>
          <p className="text-sm text-gray-500">
            {displayDate} • {displayTime}
          </p>
        </div>
      </div>

      {/* Promo */}
      <div className="flex items-center justify-between border rounded-lg p-3">
        <div className="flex items-center gap-2 text-[#DC2626] font-medium text-sm">
          <span className="text-lg">%</span>
          <span>Lihat promo/voucher</span>
        </div>
        <input type="radio" disabled className="accent-[#DC2626]" />
      </div>

      {/* Point */}
      <div className="flex items-center justify-between border rounded-lg p-3">
        <div>
          <p className="font-medium text-gray-800 text-sm">Pakai 0 poin</p>
          <p className="text-xs text-gray-500">Poin saat ini: 0</p>
        </div>
        <input type="radio" disabled className="accent-[#DC2626]" />
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm font-medium text-gray-600">Total Pembayaran</p>
        <div className="flex items-center gap-1 font-semibold text-gray-900">
          Rp {formatCurrency(total)}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onPayment}
        disabled={!isPaymentEnabled}
        className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
          isPaymentEnabled
            ? "bg-[#DC2626] text-white hover:bg-[#B91C1C] cursor-pointer"
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