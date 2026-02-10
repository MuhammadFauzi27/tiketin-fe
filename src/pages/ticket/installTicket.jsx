import { useRef } from "react";
import html2canvas from "html2canvas";
import { DigitalTicket } from "../../components/DigitalTicket";
import { getAllTicket } from "../../services/bookingService.js";

export const ETicketPage = () => {
  const ticketRef = useRef(null);

  const tickets = getAllTicket();
  const latestTicket = tickets[tickets.length - 1];

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "e-ticket.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 pt-16">
      <div className="max-w-md mx-auto">

        {/* EMPTY STATE */}
        {tickets.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center">
            <p className="text-gray-800 font-semibold text-lg">
              Tiket belum ada
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Silakan lakukan pemesanan terlebih dahulu
            </p>
          </div>
        )}

        {/* TICKET */}
        {tickets.length > 0 && (
          <>
            <div ref={ticketRef}>
              <DigitalTicket {...latestTicket} />
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 text-white font-semibold py-3 rounded-xl transition"
                style={{ backgroundColor: "#DC2626" }}
              >
                Download E-Ticket
              </button>

              <button
                onClick={() => window.print()}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl transition"
              >
                Print
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-4">
              Simpan e-ticket ini dan tunjukkan saat boarding
            </p>
          </>
        )}
      </div>
    </div>
  );
};
