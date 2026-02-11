import { TicketPercent, Check } from "lucide-react";

export const Coupon = ({
                              coupons = [],
                              selectedCoupon,
                              onSelect,
                            }) => {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-4">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
        <TicketPercent className="w-5 h-5" />
        Pilih Kupon / Voucher
      </h3>

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
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
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
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </div>

                <div className="mt-2 text-sm font-medium text-green-600">
                  Hemat Rp{coupon.discount.toLocaleString("id-ID")}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
