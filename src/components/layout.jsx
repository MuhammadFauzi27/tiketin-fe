import {Outlet, useNavigate} from "react-router-dom";
import React from "react";
import { Ticket, User } from "lucide-react";

export const Layout = () => {
  const navigate = useNavigate();

  const handleCheckTicket = () => {
    navigate("/ticket/install");
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <span className="font-bold text-xl text-red-600">Tiket</span>
              <span className="font-bold text-xl">In</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={handleCheckTicket}
            >
              <Ticket className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Mainframe */}
      <main className="flex-1 bg-slate-100 pt-6">

      <Outlet />
      </main>
    </div>
  );
}
