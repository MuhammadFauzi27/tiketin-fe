import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, BusFront, Star } from "lucide-react";

export default function DetailBus() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // kalau user refresh halaman, state bisa hilang
  if (!state?.bus) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="font-semibold text-gray-700">
          Data bus tidak ditemukan. Silakan pilih bus dari halaman pencarian.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-red-200/60 hover:bg-red-300 font-semibold px-4 py-2 rounded-2xl"
        >
          Kembali
        </button>
      </div>
    );
  }

  const { bus, from, to, date, seat } = state;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-semibold text-gray-700 hover:text-red-700"
      >
        <ArrowLeft /> Kembali
      </button>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BusFront className="text-red-700" />
            <p className="text-2xl font-bold">{bus.po}</p>
            <p className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded-xl">
              {bus.kelas}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Star size={16} className="fill-yellow-300 text-yellow-300" />
            <p className="font-semibold">{bus.rating}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="text-3xl font-bold">{bus.depart}</p>
            <div className="flex flex-col">
              <p className="font-semibold text-gray-700">{bus.duration}</p>
              <div className="mt-2 h-[2px] w-44 bg-gray-200 relative">
                <div className="absolute left-0 top-0 h-[2px] w-1/2 bg-red-700" />
              </div>
            </div>
            <p className="text-3xl font-bold">{bus.arrive}</p>
          </div>

          <p className={`text-sm font-semibold ${bus.seatsLeft <= 5 ? "text-red-600" : "text-green-600"}`}>
            Kursi tersisa {bus.seatsLeft}
          </p>
        </div>

        <div className="mt-3 text-sm font-semibold text-gray-600 flex justify-between">
          <p>{bus.from}</p>
          <p>{bus.to}</p>
        </div>

        <div className="mt-6 flex justify-between items-end">
          <div className="flex gap-2 flex-wrap">
            {bus.tags.map((t) => (
              <span key={t} className="text-green-700/90 text-xs bg-gray-200/40 rounded-xl px-3 py-2">
                {t}
              </span>
            ))}
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold">IDR {bus.price.toLocaleString("id-ID")}</p>
            <p className="text-xs font-semibold text-gray-600">/ Pax</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-sm font-semibold text-gray-700">
          <p>Rute: {from?.name || bus.from} → {to?.name || bus.to}</p>
          <p>
            Tanggal:{" "}
            {date
              ? new Date(date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </p>
          <p>Kursi: {seat} pax</p>
        </div>
      </div>
    </div>
  );
}
