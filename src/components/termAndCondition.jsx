export const TermAndCondition = () => {
  return (
    <div className="space-y-4 text-sm">

      {/* Keberangkatan */}
      <details className="group bg-white rounded-xl border shadow-sm" open>
        <summary className="cursor-pointer px-5 py-4 flex items-center justify-between font-semibold text-gray-800">
          <div className="flex items-center gap-2">
            Keberangkatan
          </div>
          <span className="transition group-open:rotate-180">⌄</span>
        </summary>

        <div className="border-t px-5 py-4">
          <ol className="list-decimal ml-4 space-y-2 text-gray-600">
            <li>
              Penumpang sudah siap setidaknya 60 menit sebelum keberangkatan di titik
              keberangkatan yang telah ditentukan oleh agen. Keterlambatan penumpang
              dapat menyebabkan tiket dibatalkan secara sepihak dan tidak mendapatkan
              pengembalian dana.
            </li>
            <li>
              Pelanggan diwajibkan untuk menunjukkan e-tiket dan identitas yang berlaku
              (KTP/Paspor/SIM).
            </li>
            <li>
              Waktu keberangkatan yang tertera di aplikasi adalah waktu lokal di titik
              keberangkatan.
            </li>
          </ol>
        </div>
      </details>

      {/* Barang Bawaan */}
      <details className="group bg-white rounded-xl border shadow-sm" open>
        <summary className="cursor-pointer px-5 py-4 flex items-center justify-between font-semibold text-gray-800">
          <div className="flex items-center gap-2">
            Barang Bawaan
          </div>
          <span className="transition group-open:rotate-180">⌄</span>
        </summary>

        <div className="border-t px-5 py-4">
          <ol className="list-decimal ml-4 space-y-2 text-gray-600">
            <li>
              Penumpang dilarang membawa barang terlarang/ilegal dan membahayakan seperti
              senjata tajam, mudah terbakar, dan benda menyengat.
            </li>
            <li>
              Ukuran dan berat bagasi mengikuti ketentuan agen. Kelebihan bagasi dapat
              dikenakan biaya tambahan.
            </li>
            <li>
              Penumpang dilarang membawa hewan jenis apapun ke dalam kendaraan.
            </li>
          </ol>
        </div>
      </details>

      {/* Kebijakan */}
      <details className="group bg-white rounded-xl border shadow-sm" open>
        <summary className="cursor-pointer px-5 py-4 flex items-center justify-between font-semibold text-gray-800">
          <div className="flex items-center gap-2">
            Kebijakan Pembatalan, Refund dan Reschedule
          </div>
          <span className="transition group-open:rotate-180">⌄</span>
        </summary>

        <div className="border-t px-5 py-4">
          <ol className="list-decimal ml-4 space-y-2 text-gray-600">
            <li>
              <span className="font-medium">Reschedule</span>
              <p className="mt-1">Perubahan jadwal tidak dapat dilakukan.</p>
            </li>
            <li>
              <span className="font-medium">Refund</span>
              <p className="mt-1">Tiket tidak dapat dibatalkan dan tidak dapat direfund.</p>
            </li>
          </ol>
        </div>
      </details>

      {/* Penyangkalan */}
      <details className="group bg-white rounded-xl border shadow-sm" open>
        <summary className="cursor-pointer px-5 py-4 flex items-center justify-between font-semibold text-gray-800">
          <div className="flex items-center gap-2">
            Penyangkalan
          </div>
          <span className="transition group-open:rotate-180">⌄</span>
        </summary>

        <div className="border-t px-5 py-4">
          <ol className="list-decimal ml-4 space-y-2 text-gray-600">
            <li>tiketin tidak bertanggung jawab atas perubahan jadwal.</li>
            <li>tiketin tidak bertanggung jawab atas keterlambatan agen.</li>
            <li>tiketin tidak bertanggung jawab atas pelanggaran hukum oleh agen.</li>
            <li>tiketin tidak bertanggung jawab atas kerusakan bagasi.</li>
          </ol>
        </div>
      </details>

    </div>
  );
};
