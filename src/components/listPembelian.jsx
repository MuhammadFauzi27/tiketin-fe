import { DataRiwayat } from "../services/data/dummy";
import {MoveRight, CalendarFold, BusFront, ReceiptText} from 'lucide-react'

function Pesanan() {
  return (
    <div className=" flex flex-col gap-4">
        <p className="text-4xl font-bold mb-2.5 text-red-700">Riwayat Pembelian</p>
        {DataRiwayat.map((item, index) => (
            <div key={index} className="border h-32 border-gray-200 p-4 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <item.icon className="text-red-700"/>
                        <p className="text-2xl font-semibold">{item.from}</p>
                        <MoveRight/>
                        <p className="text-2xl font-semibold">{item.to}</p>
                    </div>

                    <div className="bg-black/70 text-white p-2 text-xs rounded-3xl">
                        <p className="font-semibold">{item.status}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-2.5">
                    <div className="flex pl-2.5 gap-2.5 items-center">
                        <div className="flex gap-1 items-center">
                            <CalendarFold size={16}/>
                            <p className="text-gray-700 font-semibold text-sm">{item.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <BusFront size={16} className="text-red-700"/>
                            <p className="text-gray-700 font-semibold text-sm">{item.bus}</p>
                        </div>
                    </div>

                    <p className="text-xl font-semibold">Rp {item.price.toLocaleString('id-ID')}</p>
                </div> 
            </div>
        ))}
    </div>
  );
}

export default Pesanan;
