import { Users } from "lucide-react";
import { IconSteeringWheel } from "@tabler/icons-react";

export const BusSeatMap = ({ seats, selectedSeat, onSelectSeat }) => {
  const handleSeatClick = (seat) => {
    if (!seat.isBooked) {
      onSelectSeat(seat.id === selectedSeat ? null : seat.id);
    }
  };

  const getSeatsByRow = (row, side) => {
    if (row === 12) return seats.filter(s => s.row === 12);
    return seats.filter(
      s => s.row === row && s.position.startsWith(side)
    );
  };

  const Seat = ({ seat }) => {
    const isSelected = selectedSeat === seat.id;

    return (
      <button
        onClick={() => handleSeatClick(seat)}
        disabled={seat.isBooked}
        className={`
          w-11 h-11 rounded-lg border-2 text-sm font-semibold
          transition-all duration-200
          ${seat.isBooked
          ? "bg-gray-300 border-gray-400 text-white cursor-not-allowed"
          : isSelected
            ? "bg-[#DC2626] border-red-700 text-white"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }
        `}
      >
        {seat.id}
      </button>
    );
  };

  const bookedCount = seats.filter(s => s.isBooked).length;
  const availableCount = seats.length - bookedCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <Users className="w-6 h-6" />
          Peta Kursi Bus
        </h3>
        <p className="text-sm text-gray-500">
          Pilih kursi yang tersedia
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white border rounded" />
          Tersedia ({availableCount})
        </span>
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 border rounded" />
          Terisi ({bookedCount})
        </span>
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#DC2626] border rounded" />
          Dipilih
        </span>
      </div>

      {/* Seat Layout */}
      <div className="bg-gray-50 p-6 rounded-xl border">
        {/* Driver Section */}
        <div className="flex justify-center gap-8 mb-6 pb-4 border-b-2 border-dashed border-gray-300">
          <div className="flex gap-2">
            {/* Empty space on left */}
            <div className="w-11 h-11" />
            <div className="w-11 h-11" />
          </div>

          <div className="w-8 flex justify-center">
            <div className="w-1 bg-gray-300 rounded" />
          </div>

          <div className="flex gap-2">
            {/* Driver seat on right */}
            <div className="w-11 h-11" />
            <div className="w-11 h-11 rounded-lg border-2 border-gray-400 bg-gray-100 flex items-center justify-center">
              <IconSteeringWheel className="w-6 h-6 text-gray-600" stroke={2} />
            </div>
          </div>
        </div>

        {/* Passenger Seats */}
        <div className="space-y-3 mb-6">
          {[...Array(11)].map((_, i) => {
            const row = i + 1;
            return (
              <div key={row} className="flex justify-center gap-8">
                <div className="flex gap-2">
                  {getSeatsByRow(row, "left").map(seat => (
                    <Seat key={seat.id} seat={seat} />
                  ))}
                </div>

                <div className="w-8 flex justify-center">
                  <div className="w-1 bg-gray-300 rounded" />
                </div>

                <div className="flex gap-2">
                  {getSeatsByRow(row, "right").map(seat => (
                    <Seat key={seat.id} seat={seat} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back row */}
        <div className="pt-4 border-t flex justify-center gap-2">
          {getSeatsByRow(12).map(seat => (
            <Seat key={seat.id} seat={seat} />
          ))}
        </div>
      </div>

      {selectedSeat && (
        <div className="text-center text-sm font-medium text-[#DC2626]">
          Kursi terpilih: <span className="text-lg">#{selectedSeat}</span>
        </div>
      )}
    </div>
  );
};