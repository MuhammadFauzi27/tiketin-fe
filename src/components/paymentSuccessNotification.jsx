import { CheckCircle } from "lucide-react";

export const PaymentSuccessNotification = ({
                                             orderId = "1336126473",
                                             amount = 184856,
                                             paymentMethod = "BCA Virtual Account",
                                             onFinish,
                                           }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-50 p-4 rounded-full">
            <CheckCircle size={48} className="text-[#DC2626]" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">
          Pembayaran Berhasil
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1">
          Pembayaran kamu telah berhasil diproses.
          Terima kasih telah melakukan transaksi.
        </p>

        {/* Summary */}
        <div className="border rounded-lg mt-4 text-left divide-y">
          <div className="flex justify-between p-3 text-sm">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium text-gray-800">{orderId}</span>
          </div>

          <div className="flex justify-between p-3 text-sm">
            <span className="text-gray-500">Metode Pembayaran</span>
            <span className="font-medium text-gray-800">
              {paymentMethod}
            </span>
          </div>

          <div className="flex justify-between p-3 text-sm">
            <span className="text-gray-500">Total Pembayaran</span>
            <span className="font-semibold text-gray-900">
              IDR {amount.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onFinish}
          className="mt-6 w-full bg-[#DC2626] hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm transition"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};
