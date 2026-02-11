//import { useNavigate} from "react-router-dom";

export default function PrivacyPolicy() {

    //const navigate = useNavigate()


    /*const handleBack = () => {
        navigate("/", {
            state: { openModal: "signup" }
        });
    };*/


  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900"> Kebijakan Privasi</h1>
                <p className="mt-2 text-sm text-gray-500">Terakhir diperbarui: <span className="font-semibold">10 Februari 2026</span></p>
                <p className="mt-6 text-gray-700 leading-relaxed"> Kami di <span className="font-semibold">TiketIn</span> menghargai dan melindungi privasi pengguna. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan layanan kami.</p>

                <div className=" flex gap-4 flex-col">
                        <h2 className="text-xl font-bold text-gray-900">1. Informasi yang Kami Kumpulkan</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Data pribadi: nama, email, nomor telepon (jika Anda berikan).</li>
                            <li>Informasi pemesanan: kota asal, tujuan, tanggal perjalanan, jumlah kursi.</li>
                            <li>Informasi pembayaran: diproses oleh penyedia pembayaran pihak ketiga yang aman.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900">2. Cara Kami Menggunakan Informasi</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Memproses pemesanan tiket dan mengirim konfirmasi.</li>
                            <li>Mengelola akun dan layanan pelanggan.</li>
                            <li>Mengirim notifikasi transaksi dan informasi penting terkait layanan.</li>
                            <li>Meningkatkan kualitas layanan dan pengalaman pengguna.</li>
                            <li>Keperluan keamanan dan pencegahan penyalahgunaan.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900">3. Berbagi Data ke Pihak Ketiga</h2>
                        <p className="text-gray-700 leading-relaxed"> Kami dapat membagikan data kepada pihak ketiga hanya bila diperlukan, misalnya: penyedia pembayaran, mitra operator bus (untuk penerbitan tiket), dan layanan analitik untuk peningkatan produk. Kami tidak menjual data pribadi Anda kepada pihak mana pun.</p>

                        <h2 className="text-xl font-bold text-gray-900">4. Penyimpanan & Keamanan Data</h2>
                            <p className="text-gray-700 leading-relaxed"> Kami menyimpan data dengan standar keamanan yang wajar dan melakukan upaya perlindungan terhadap akses tidak sah, perubahan, pengungkapan, atau perusakan data.</p>

                        <h2 className="text-xl font-bold text-gray-900">5. Hak Pengguna</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Meminta akses, koreksi, atau pembaruan data pribadi Anda.</li>
                            <li>Meminta penghapusan data tertentu sesuai ketentuan yang berlaku.</li>
                            <li>Menolak komunikasi pemasaran (jika ada) kapan saja.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900">6. Perubahan Kebijakan</h2>
                        <p className="text-gray-700 leading-relaxed"> Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan ditampilkan di halaman ini beserta tanggal pembaruan.</p>

                        <h2 className="text-xl font-bold text-gray-900">7. Kontak</h2>
                        <p className="text-gray-700 leading-relaxed"> Jika Anda memiliki pertanyaan terkait kebijakan privasi, silakan hubungi kami melalui:</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
