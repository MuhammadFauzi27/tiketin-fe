import { DataPesanan } from "../services/data/dummy";
import { MoveRight, ReceiptText, BusFront, CalendarClock} from "lucide-react";

function Pesanan() {
  return (
    <div className=" flex  flex-col gap-4">
            <p className="text-4xl font-bold mb-2.5 text-red-700">Data Pesanan</p>
            {DataPesanan.map((item, index) => (
                <div key={index} className="border border-gray-200 p-4 shadow-lg rounded-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center mb-2.5">
                            <item.icon size={45} className="text-black border border-red-300 bg-red-200 p-2.5 rounded-xl"/>
                            <p className="text-2xl font-semibold">{item.from}</p>
                            <MoveRight/>
                            <p className="text-2xl font-semibold">{item.to}</p>
                        </div>
                        <p className="bg-green-400/40 p-2 text-xs w-14 text-center font-semibold rounded-xl">{item.status}</p>
                    </div>

                    <div className="flex items-center gap-2.5 pl-2.5 mb-2">
                        <div className="flex items-center gap-2 font-semibold text-gray-700">
                            <CalendarClock size={16}/>
                            <p>{item.date}</p>
                        </div>

                        <div className="flex items-center gap-2 font-semibold text-gray-700">
                            <BusFront size={16} className="text-red-700"/>
                            <p>{item.bus}</p>
                            <p>{item.kelas}</p>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-semibold text-sm">Jumlah Kursi <span className="text-red-700">{item.seats}</span></p>
                        <p className="text-xl font-semibold">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex gap-2 justify-end items-center mt-6">
                        <ReceiptText size={16} className="text-red-700"/>
                        <p className="font-semibold text-sm hover:underline underline-red-700 hover:text-red-700">Detail Pesanan</p>
                </div>
                </div>
            ))}
    </div>
  );
}

export default Pesanan;
