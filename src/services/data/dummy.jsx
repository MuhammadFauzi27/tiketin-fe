import {BadgeCheck, TicketCheck, Clock, ShieldCheck, MapPin, UserRoundSearch, Wallet, Gift, Bus} from 'lucide-react'
import ImageSurabaya from '../../assets/surabaya.jpg'
import ImagePalembang from '../../assets/palembang.jpg'
import ImageJakarta from '../../assets/jakarta.jpg'

export const Kategori = [
    {"icon" : BadgeCheck, "title" : "500+ PO Bus", "sub" : "Pilihan lengkap, perjalanan nyaman."},
    {"icon" : TicketCheck, "title" : "E-Ticket Instan", "sub" : "Cepat, praktis, tanpa ribet."},
    {"icon" : Clock, "title" : "Support 24/7", "sub" : "Selalu ada saat kamu butuh."},
    {"icon" : ShieldCheck, "title" : "Pembayaran Aman", "sub" : "Keamanan Terjamin."}
]


export const Populer = [
    {"image" : ImageSurabaya, "title" : "Bandung to Surabaya"},
    {"image" : ImagePalembang, "title" : "Bandung to Palembang"},
    {"image" : ImageJakarta, "title" : "Bandung to jakarta"}
]

export const Pesan = [
    {"icon" : MapPin, "title" : "Pilih Rute", "sub" : "Tentukan kota asal, tujuan perjalanan, dan tanggal keberangkatan sesuai rencana kamu."},
    {"icon" : UserRoundSearch, "title" : "Pilih Kursi", "sub" : "Tentukan posisi duduk yang kamu inginkan agar perjalanan terasa lebih nyaman."},
    {"icon" : Wallet, "title" : "Langsung Bayar", "sub" : "Selesaikan pembayaran dengan aman & cepat lalu dapatkan e-ticket secara instan."},
]

export const TestimoniData = [
    {"name" : "Ucup - Bandung", "text" : "Pertama kali pesan bus online, ternyata gampang banget. Kursinya sesuai, e-ticket langsung masuk.", "rating" : 5},
    {"name" : "Andi - Jakarta", "text" : "Dari pencarian hingga payment cepet, nggak ribet. Enak buat yang mepet waktu berangkat.", "rating" : 4},
    {"name" : "Otong - Semarang", "text" : "Pertama kali pesan bus online, ternyata gampang banget. Kursinya sesuai, e-ticket langsung masuk.", "rating": 5},
    {"name" : "Farhan - Palembang", "text" : "Pembayarannya aman dan cepat.", "rating" : 5},
    {"name" : "Aulia - Bandung", "text" : "Flow pesannya enak banget. Tinggal pilih rute, kursi, beres. Cocok buat yang nggak suka ribet.", "rating" : 5}
]

export const Coupons = [
    { "title": "Hemat sampai 10% untuk Tiket Bus Pertama Kamu", "subtitle": "Berlaku untuk New User", "code": "JALANYUK", "icon": Gift },
    { "title": "Hemat sampai 10% untuk Tiket Bus Rute Favorit", "subtitle": "Berlaku untuk New User", "code": "JALANYUK", "icon": Gift },
    { "title": "Hemat sampai 12% untuk Tiket Bus Antar Kota", "subtitle": "Berlaku untuk New User", "code": "JALANYUK", "icon": Gift },
    { "title": "Hemat sampai 15% untuk Tiket Bus Pertama Kamu", "subtitle": "Berlaku untuk New User", "code": "JALANYUK", "icon": Gift },
    { "title": "Hemat sampai 25% untuk Tiket Bus Pertama Kamu", "subtitle": "Berlaku untuk New User", "code": "JALANYUK", "icon": Gift },
]

export const DataRiwayat = [
    { "id": "TX-982341", "icon" : Bus, "from": "Bandung", "to": "Jakarta", "date": "12 Desember 2025", "bus": "Harapan Jaya - Executive", "price": 165000, "status": "Berhasil",},
    { "id": "TX-982343", "icon" : Bus, "from": "Semarang", "to": "Surabaya", "date": "12 januari 2025", "bus": "Harapan Jaya - Executive", "price": 185000, "status": "Berhasil",},
    { "id": "TX-982112", "icon" : Bus, "from": "Jakarta", "to": "Yogyakarta", "date": "20 Desember 2024", "bus": "Sinar Jaya - Economy", "price": 230000, "status": "Menunggu Pembayaran",},
    { "id": "TX-981001", "icon" : Bus, "from": "Bandung", "to": "Semarang", "date": "02 Jan 2024", "bus": "Rosalia Indah - Executive", "price": 280000, "status": "Dibatalkan",},
]


export const DataPesanan = [
    { "id": "BK-982341", "icon" : Bus, "from": "Bandung", "to": "Jakarta", "date": "12 Feb 2026", "time": "22:00", "bus": "Harapan Jaya", "kelas": "Executive", "seats": 2, "price": 330000, "status": "active"},
    {"id": "BK-982112", "icon" : Bus, "from": "Jakarta", "to": "Yogyakarta", "date": "20 Jan 2026", "time": "08:30", "bus": "Sinar Jaya", "kelas": "Economy", "seats": 1, "price": 230000, "status": "active"},
    { "id": "BK-981001", "icon" : Bus, "from": "Bandung", "to": "Semarang", "date": "02 Jan 2026", "time": "06:00", "bus": "Rosalia Indah", "kelas": "Executive", "seats": 1, "price": 280000, "status": "active"},
]