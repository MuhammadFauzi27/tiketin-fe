import { Outlet } from "react-router-dom";
import React from "react";

export const Layout = () => {
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
            <button className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">MF</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mainframe */}
      <main className="flex-1 bg-slate-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
