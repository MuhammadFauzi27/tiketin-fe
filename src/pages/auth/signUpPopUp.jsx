import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
//import { useNavigate} from "react-router-dom";

export default function SignUpModal({ open, onClose, onOpenLogin }) {
    const { register } = useAuth();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    //const navigate = useNavigate()

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

    const handleSubmit = (e) => {
        e.preventDefault();
        register({ fullName, email, password });
        onClose();
    };

    const handleRegister = () => {
        register({ fullName, email, password });

        toast.success("Daftar berhasil")
        onClose?.()
        onOpenLogin?.()
        setEmail("")
        setPassword("")
        setFullName("")
    };

    /*const goPrivacy = () => {
        onClose?.();
        navigate("/privacy-policy", {
            state: { openModal: "signup" },
        });
    };*/


    return (
        <div className="fixed inset-0 z-50 flex justify-center h-screen">
            <div onClick={onClose} className="absolute inset-0 bg-black/60 "></div>

            <div onClick={(e) => e.stopPropagation()} className="h-[450px] relative mt-40 w-[400px] rounded-2xl bg-white p-6 shadow-xl">
                <p className="text-2xl text-center text-red-600 font-semibold">TiketIn</p>
                <p className="text-sm text-center text-gray-600 font-semibold">Daftar untuk mulai pesan tiket bus dengan mudah</p>

                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="flex flex-col gap-4">
                        <input type="text" value={fullName} onChange={(e) =>setFullName(e.target.value)} className=" w-full rounded-xl border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="FullName"/>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className=" w-full rounded-xl border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Email"/>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-400 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Password"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type="button" onClick={handleRegister} className="mt-4 w-full rounded-xl bg-red-700 py-2.5 font-semibold text-white hover:bg-red-600 transition">Daftar</button>
                    <p className="text-sm text-gray-700 text-center mt-4 font-semibold">Dengan melanjutkan, kamu menyetujui <a href="/privacy-policy" target="_blank" className="underline underline-black">Kebijakan Privasi</a> dan <a href="/syarart-ketentuan" target="_blank" className="underline underline-black">Syarat & Ketentuan</a><span className="text-red-700"> TiketIn.</span></p>

                    <div className="flex justify-center items-center w-full text-sm text-gray-500 mt-4">
                        <p>Sudah punya akun?</p>
                        <button type="button" onClick={onOpenLogin} className="font-semibold text-red-700 ml-1">Masuk</button>
                    </div>
                </form>
            </div>
        </div>
  )
}
