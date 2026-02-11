import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import{ useEffect, useState } from "react";
import LoginModal from "../pages/auth/loginPopUp"
import SignUp from '../pages/auth/signUpPopUp'
import { useNavigate} from "react-router-dom";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import {UserPen, History, Power, ScrollText} from 'lucide-react'

export const LayoutPlain = () => {
    return (
        <div className="min-h-screen bg-white">
            <Outlet />
        </div>
    );
}

export const LayoutSetting = () => {
    return (
        <div className=" bg-gray-50">
            <div className="mx-auto max-w-7xl mt-8 px-4 py-8">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-4 sticky top-24 h-fit">
                        <Sidebar />
                    </div>
                    <main className="col-span-8">
                        <Outlet />
                    </main>

                </div>
            </div>
        </div>
    )
}

export const LayoutLanding= () => {
    const [scrolled, setScrolled] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)
    const navigate = useNavigate()
    const [openProfile, setOpenProfile] = useState(false);
    
    const {user, logout} = useAuth()

    const showLogin = () => {
        setOpenRegister(false)
        setOpenLogin(true)
    }

    const showRegister = () => {
        setOpenRegister(true)
        setOpenLogin(false)
    }



    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 128)
        }

        window.addEventListener('scroll', handleScroll, {passive : true})
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const getInitials = (fullName = "") => {
        const parts = fullName.trim().split(" ").filter(Boolean);
        const first = parts[0]?.[0] || "";
        const second = parts[1]?.[0] || parts[0]?.[1] || "";
        return (first + second).toUpperCase();
    };

    return (
        <>
        <div className="min-h-screen flex flex-col">
            <div className={`fixed flex z-50 w-full h-16 bg-transparent transition-all duration-300 ease-in-out items-center ${scrolled? "justify-between bg-white" : "justify-around"}`}>
                <p className={`sm:text-3xl text-xl font-bold ${scrolled? "text-red-700 ml-0 sm:ml-24" : "text-white"}`}>TiketIn</p>
                <div className="flex gap-4">
                    <ul className={`flex ${scrolled? "text-gray-700 ml-0 sm:ml-[800px] font-semibold gap-2.5 sm:gap-8" : "text-white font-semibold gap-2.5 sm:gap-12"}`}>
                        <li>Cek Pesanan</li>
                        <li>Promo</li>
                        <li>Mitra Bus</li>
                    </ul>
                </div>
                {!user ? (
                    <div className={`p-2.5 w-24 flex justify-center  font-semibold rounded-full ${scrolled ? "bg-red-700 hover:bg-red-600 text-white sm:mr-12 shadow-2xl" : "text-red-800 bg-white"}`}>
                        <button type="button" onClick={() => setOpenLogin(true)} className="hover:bg-gray-300">Masuk</button>
                    </div>
                    ) : (
                    <div className={`relative ${scrolled ? "sm:mr-12" : ""}`}>
                        <button type="button" onClick={() => setOpenProfile((v) => !v)} className="flex items-center gap-2.5 px-3 py-2 rounded-full hover:bg-gray-300/20">
                            <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                                <p className="text-xs font-bold text-red-700">{getInitials(user.fullName)}</p>
                            </div>
                            <p className={`font-semibold ${scrolled ? "text-gray-800" : "text-white"}`}>
                                {user.fullName.charAt(0).toUpperCase() + user?.fullName?.slice(1)}
                            </p>
                        </button>

                        {openProfile && (
                            <div className="absolute top-full right-0 mt-2 w-[200px] bg-white rounded-xl shadow-xl z-50 p-2">
                                <button onClick={() => { setOpenProfile(false); navigate("/pengaturan"); }} className="w-full text-left flex font-semibold items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                                    <UserPen className="text-gray-700" />
                                    Profil Saya
                                </button>

                                <button onClick={() => { setOpenProfile(false); navigate("/pengaturan/list-pembelian"); }} className="w-full text-left flex font-semibold items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                                    <History className="text-gray-700" />
                                    Riwayat Pembelian
                                </button>

                                <button onClick={() => { setOpenProfile(false); navigate("/pengaturan/pesanan"); }} className="w-full text-left flex font-semibold items-center gap-2 px-4 py-2.5  rounded-xl text-sm">
                                    <ScrollText className="text-gray-700" />
                                    Pesanan Saya
                                </button>

                                <button onClick={() => { logout?.(); setOpenProfile(false); toast.success("Berhasil logout"); navigate("/home"); }} className="w-full text-left flex font-semibold items-center gap-2 px-4 py-2.5  rounded-xl text-sm">
                                    <Power className="text-gray-700" />
                                Logout
                                    </button>
                            </div>
                        )}
                    </div>
                )}

                <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} onOpenRegister={showRegister} />
                <SignUp open={openRegister} onClose={() => setOpenRegister(false)} onOpenLogin={showLogin} />
            </div>

            {scrolled && (
                <div className="fixed top-[64px] sm:left-4 z-50 mt-3 px-4 py-1 rounded-full border border-gray-100/20 shadow-sm bg-white/10 backdrop-blur">
                    <p className="text-xs font-semibold text-black/80">OFFICIAL PARTNER 500+ PO BUS</p>
                </div>
            )}

            <main className="min-h-screen">
                <Outlet />
            </main>
        </div>
        </>
    )
}
