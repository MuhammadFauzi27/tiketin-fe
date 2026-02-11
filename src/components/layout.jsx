import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import {UserPen, History, Power, ScrollText} from 'lucide-react'
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";

export const Layout = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate()
  const { user, logout } = useAuth();

  const getInitials = (fullName = "") => {
        const parts = fullName.trim().split(" ").filter(Boolean);
        const first = parts[0]?.[0] || "";
        const second = parts[1]?.[0] || parts[0]?.[1] || "";
        return (first + second).toUpperCase();
    };


  return (
    <>
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <span className="font-bold text-3xl text-red-600">Tiket</span>
              <span className="font-bold text-3xl">In</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            {user && (
              <div className="relative">
                <div onClick={() => setOpenProfile(!openProfile)} className="flex w-[200px] items-center gap-4">
                  <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                    <p className="text-xs font-bold text-red-700">{getInitials(user.fullName)}</p>
                  </div>
                  <p className="text-red-700 font-semibold cursor-pointer">
                    {user?.fullName.charAt(0).toUpperCase() + user?.fullName?.slice(1)}
                  </p>
                </div>
                {openProfile && (
                  <div className="absolute p-2 transition-all right-4 mt-2 w-[200px] bg-white rounded-xl shadow-xl z-50">
                    <button onClick={() => navigate("/pengaturan")} className="w-full text-left flex font-semibold items-center gap-2 px-4 py-2.5 hover:bg-gray-200 hover:rounded-xl text-sm" >
                      <UserPen className="text-gray-700" />
                        Profil Saya
                    </button>
                    <button onClick={() => navigate("/pengaturan/list-pembelian")} className="w-full text-left flex font-semibold items-center gap-2 px-4 py-2.5 hover:bg-gray-200 hover:rounded-xl text-sm">
                      <History className="text-gray-700" />
                      Riwayat Pembelian
                    </button>
                    <button onClick={() => navigate("/pengaturan/pesanan")} className="w-full text-left flex font-semibold items-center gap-2 px-4 py-2.5 hover:bg-gray-200 hover:rounded-xl text-sm">
                      <ScrollText className="text-gray-700" />
                      Pesanan Saya
                    </button>
                    <button onClick={() => {logout?.(); setOpenProfile(false); toast.success("Berhasil logout"); navigate("/home"); }} className="w-full text-left flex font-semibold items-center gap-2 px-4 py-2.5 hover:bg-gray-200 hover:rounded-xl text-sm">
                      <Power className="text-gray-700" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )} 
          </div>
        </div>
      </header>

      {/* Mainframe */}
      <main className="flex-1 bg-white p-6">
        <Outlet />
      </main>
    </div>
    
    </>
  );
}    
