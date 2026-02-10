import QRCode from 'react-qr-code';

export const DigitalTicket = ({
                                passenger = {
                                  name: "Marvin McKinney",
                                  type: "Passenger"
                                },
                                departure = {
                                  city: "Surakarta",
                                  code: "SLO",
                                  date: "Oct 06, 2025",
                                  time: "07:30 AM"
                                },
                                arrival = {
                                  city: "Semarang",
                                  code: "SMG",
                                  date: "Oct 06, 2025",
                                  time: "09:00 AM"
                                },
                                duration = "2h 30m",
                                seat = {
                                  number: "2",
                                  class: "Economy"
                                },
                                bookingCode = "AMSKDYA",
                                passengers = "Adult 1x",
                                total = 100000,
                                qrData = "102970 12819GA18217"
                              }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
      {/* Header with passenger info */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(to right, #DC2626, #B91C1C)' }}>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">
            {passenger.name}
          </h2>
          <p className="text-red-50 text-sm">
            {passenger.type}
          </p>
        </div>
      </div>

      {/* Main ticket content */}
      <div className="px-6 py-6">
        {/* Route section */}
        <div className="flex items-center justify-between mb-6">
          {/* Departure */}
          <div className="text-left">
            <p className="text-gray-500 text-xs mb-1">
              {departure.city}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {departure.code}
            </p>
          </div>

          {/* Duration indicator */}
          <div className="flex-1 px-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-center relative">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#DC2626' }}></div>
              <div className="flex-1 border-t-2 border-dashed border-red-300"></div>
              <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#DC2626' }}></div>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              {duration}
            </p>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <p className="text-gray-500 text-xs mb-1">
              {arrival.city}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {arrival.code}
            </p>
          </div>
        </div>

        {/* Date and time */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-900 font-medium">
              {departure.date}
            </p>
            <p className="text-gray-900 font-bold text-lg">
              {departure.time}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-900 font-medium">
              {arrival.date}
            </p>
            <p className="text-gray-900 font-bold text-lg">
              {arrival.time}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-500 text-sm mb-1">Seat</p>
            <p className="text-gray-900 font-bold">No. {seat.number}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm mb-1">Class</p>
            <p className="text-gray-900 font-bold">{seat.class}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Booking Code</p>
            <p className="text-gray-900 font-bold">{bookingCode}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm mb-1">Passengers</p>
            <p className="text-gray-900 font-bold">{passengers}</p>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
          <p className="text-gray-900 font-semibold">Total</p>
          <p className="font-bold text-xl" style={{ color: '#DC2626' }}>
            {formatCurrency(total)}
          </p>
        </div>

        {/* QR Code section */}
        <div className="text-center">
          <p className="text-gray-900 font-semibold mb-2">E-ticket</p>
          <p className="text-gray-500 text-sm mb-4">Scan Before Boarding</p>

          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-lg border-2">
              <QRCode
                value={qrData}
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>

          <p className="text-gray-500 text-sm font-mono">
            {qrData}
          </p>
        </div>
      </div>
    </div>
  );
};