import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

const paymentMethods = [
  {
    id: "bca",
    name: "BCA Virtual Account",
    logo: "/images/bca-logo.png",
  },
  {
    id: "mandiri",
    name: "Mandiri Virtual Account",
    logo: "/images/mandiri.png",
  },
  {
    id: "bri",
    name: "BRI Virtual Account",
    logo: "/images/bri.png",
  },
  {
    id: "gopay",
    name: "Gopay",
    logo: "/images/gopay.png",
  },
  {
    id: "dana",
    name: "Dana",
    logo: "/images/dana.png",
  },
  {
    id: "shopeepay",
    name: "Shopeepay",
    logo: "/images/shopeepay.png",
  },
];

export const PaymentMethod = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const MAX_VISIBLE = 4;

  const visibleMethods = showAll
    ? paymentMethods
    : paymentMethods.slice(0, MAX_VISIBLE);

  const handleSelect = (method) => {
    setSelected(method.id);
    onSelect?.(method);
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">
          Metode Pembayaran
        </h2>

        <div className="flex items-center gap-1 text-xs text-[#DC2626]">
          <ShieldCheck size={14} />
          <span className="font-semibold">100% SECURITY</span>
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-3">
        {visibleMethods.map((method) => {
          const isActive = selected === method.id;

          return (
            <label
              key={method.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
          ${
                isActive
                  ? "border-[#DC2626] bg-red-50"
                  : "border-gray-200 hover:border-[#DC2626]"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={isActive}
                onChange={() => handleSelect(method)}
                className="accent-[#DC2626]"
              />

              <div className="flex items-center gap-3">
                <div className="w-10 h-6 flex items-center justify-center">
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-[#DC2626]" : "text-gray-700"
                  }`}
                >
            {method.name}
          </span>
              </div>
            </label>
          );
        })}
      </div>

      {/* Lihat Semua */}
      {paymentMethods.length > MAX_VISIBLE && (
        <>
          <div className="border-t my-4" />

          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-1 text-sm font-medium text-[#DC2626] hover:underline"
          >
            {showAll ? "Sembunyikan" : "Lihat semua"}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </>
      )}
    </div>
  );
};
