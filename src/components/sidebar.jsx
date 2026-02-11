import { NavLink } from "react-router-dom";
import { Settings, ClipboardList, Ticket, ChevronLeft } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

function Sidebar(){
    const {user} =useAuth()
    const navigate = useNavigate()

    if (!user) return null


    return(
        <div className="w-full">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full border border-gray-200 bg-red-200 flex items-center justify-center overflow-hidden">
                            {user.photo ? (
                                <img src={user.photo} alt="profile" className="h-full w-full object-cover"/>
                                ) : (
                                <span className="font-semibold text-red-600">
                                    {user.fullName.slice(0, 2).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <p className="font-semibold text-gray-900">{user.fullName.toUpperCase()}</p>
                    </div>
                </div>

                <div className="flex flex-col p-6 gap-2.5">
                    <NavLink to={'/pengaturan'} end className={({isActive}) => ["flex items-center text-lg gap-2.5 p-4 rounded-2xl font-semibold transition", isActive? "bg-red-600 text-white" : "hover:bg-red-200 text-black"].join(" ")}>
                        <Settings/>
                        Pengaturan
                    </NavLink>
                    <NavLink to={'/pengaturan/list-pembelian'} end className={({isActive}) => ["flex text-lg items-center gap-2.5 p-4 rounded-2xl font-semibold transition", isActive? "bg-red-600 text-white" : "hover:bg-red-200 text-black"].join(" ")}>
                        <ClipboardList/>
                        List Pembelian
                    </NavLink>
                    <NavLink to={'/pengaturan/pesanan'} end className={({isActive}) => ["flex text-lg items-center gap-2.5 p-4 rounded-2xl font-semibold transition", isActive? "bg-red-600 text-white" : "hover:bg-red-200 text-black"].join(" ")}>
                        <Ticket/>
                        Pesanan Saya
                    </NavLink>
                </div>

            </div>
            <div className="w-full flex justify-center">
                <button onClick={() => navigate('/cari-bus')} className="flex w-full items-center gap-2.5 p-4 hover:bg-gray-300 bg-white border-gray-2 border shadow-sm rounded-2xl m-2.5 ">
                    <ChevronLeft/>
                    <p className="font-semibold">Kembali</p>
                </button>
            </div>

        </div>
    )
}

export default Sidebar