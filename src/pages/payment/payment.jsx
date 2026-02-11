import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { PaymentMethod } from "../../components/PaymentMethod";
import { PaymentSummary } from "../../components/PaymentSummary";
import {createTicket, extractLocation} from "../../services/bookingService.js";
import { PaymentSuccessNotification } from "../../components/PaymentSuccessNotification";

const COUNTDOWN_TIME = 900;

export const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_TIME);

  // Ambil data dari page sebelumnya
  const {
    form,
    bookingId,
    product,
    total = 0,
    seat
  } = state || {};

  const [finalTotal, setFinalTotal] = useState(total);
  const [usedCoupon, setUsedCoupon] = useState(null);

  const departureArea = extractLocation(product?.departureLocation);

  const arrivalArea = extractLocation(product?.arrivalLocation);


  const buildTicketData = (finalAmount) => ({
    passenger: {
      name: form.name || "Guest",
      type: "Passenger",
    },
    departure: {
      city: departureArea,
      code: product?.departureCode,
      date: product?.date,
      time: product?.departureTime,
    },
    arrival: {
      city: arrivalArea,
      code: product?.arrivalCode,
      date: product?.date,
      time: product?.arrivalTime,
    },
    duration: product?.travelDuration,
    seat: {
      number: seat,
      class: product?.seatClass || "Economy",
    },
    bookingCode: bookingId,
    passengers: "Adult 1x",
    total: finalAmount,
    qrData: bookingId,
  });

  const coupons = [
    {
      id: "DISC20",
      title: "Diskon 20K",
      description: "Minimal transaksi Rp150.000",
      discount: 20000,
      expiredAt: "31 Des 2026",
    },
    {
      id: "HEMAT10",
      title: "Hemat 10K",
      description: "Tanpa minimum",
      discount: 10000,
      expiredAt: "15 Mar 2026",
    },
  ];

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handlePayment = ({ total, coupon }) => {
    if (!selectedMethod) return;

    setFinalTotal(total);
    setUsedCoupon(coupon);

    const ticketData = buildTicketData(total);
    createTicket(ticketData);

    setShowSuccess(true);
  };

  const hour = "00";
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          {/* COUNTDOWN */}
          <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Selesaikan sebelum
            </span>

            <div className="flex gap-1 text-white text-sm font-semibold">
              <span className="bg-[#DC2626] px-2 py-1 rounded">{hour}</span>
              <span className="text-[#DC2626] py-1">:</span>
              <span className="bg-[#DC2626] px-2 py-1 rounded">{minutes}</span>
              <span className="text-[#DC2626] py-1">:</span>
              <span className="bg-[#DC2626] px-2 py-1 rounded">{seconds}</span>
            </div>
          </div>

          <PaymentMethod
            onSelect={setSelectedMethod}
            selectedMethod={selectedMethod}
          />
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <PaymentSummary
            orderId={bookingId}
            route={`${departureArea} → ${arrivalArea}`}
            date={product?.date}
            time={product?.time}
            total={total}
            selectedMethod={selectedMethod}
            onPayment={handlePayment}
            coupons={coupons}
          />
        </div>
      </div>

      {/* SUCCESS */}
      {showSuccess && (
        <PaymentSuccessNotification
          orderId={bookingId}
          paymentMethod={selectedMethod?.name}
          amount={finalTotal}
          onFinish={() => {
            setShowSuccess(false)
            navigate("/")
          }}
        />
      )}
    </div>
  );
};