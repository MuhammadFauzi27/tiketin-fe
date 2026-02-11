import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import  toast from 'react-hot-toast'
import { useAuth } from "../../context/useAuth";

export default function LoginModal({ open, onClose, onOpenRegister }) {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    useEffect(() => {
        if (!open) return

        const handleEscape= (e) => {
            if (e.key === "Escape") 
                onClose()
            }

            window.addEventListener("keydown", handleEscape);
            return () => window.removeEventListener("keydown", handleEscape);
    }, [open, onClose])

    if (!open) return null

    const handleLogin = () => {
        const res = login({ email, password });

        if (res?.ok) {
            toast.success("Login berhasil");
            onClose?.();
            setTimeout(() => navigate("/home"), 300);
        } else {
            toast.error("Login gagal");
        }

        setEmail("")
        setPassword("")
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center h-screen">
            <div onClick={onClose} className="absolute inset-0 bg-black/60 "></div>
            {/* MODAL */}
            <div onClick={(e) => e.stopPropagation()} className="h-[400px] relative mt-40 w-[400px] rounded-2xl bg-white p-6 shadow-xl">
                <p className="text-2xl text-center text-red-600 font-semibold">TiketIn</p>
                <p className="text-sm text-center text-gray-600 font-semibold">Login untuk lanjut pesan tiket bus</p>

                <div className="flex flex-col">
                    <button className="border border-gray-400 flex justify-center items-center gap-2.5 p-2.5 w-full rounded-xl mt-6 font-semibold text-sm hover:bg-gray-100"><FcGoogle size={24}/><p>Login dengan Google</p></button>
                    <div className="flex items-center mt-2.5">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <span className="mx-3 text-xs text-gray-400">atau</span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="mt-2.5">
                    <div className="flex flex-col gap-2.5">
                        <input value={email}  onChange={(e) => setEmail(e.target.value)} type="email" className=" w-full rounded-xl border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Email"/>
                        <input  value={password}   onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-xl border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Password" />
                    </div>

                    <button type="button" onClick={handleLogin} className="mt-4 w-full rounded-xl bg-red-700 py-2.5 font-semibold text-white hover:bg-red-600 transition">Masuk</button>

                    <div className="flex justify-center items-center w-full text-sm text-gray-500 mt-4">
                        <p>Belum punya akun?</p>
                        <button type="button" onClick={onOpenRegister} className="font-semibold text-red-700 ml-1">Daftar</button>
                    </div>
                </form>
            </div>
        </div>
  )
}
