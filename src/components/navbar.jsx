import { useState, useEffect } from "react"
import LoginModal from "../pages/auth/loginPopUp"
import SignUp from '../pages/auth/signUpPopUp'

function Navbar(){

    const [scrolled, setScrolled] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)

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

    return(
        <div className="flex flex-col">
            <div className={`fixed flex z-10 w-full h-15 bg-transparent transition-all duration-300 ease-in-out items-center ${scrolled? "justify-between bg-white" : "justify-around"}`}>
                <p className={`text-3xl font-semibold ${scrolled? "text-red-700 ml-8" : "text-white"}`}>TiketIn</p>
                <div className="flex gap-4">
                    <ul className={`flex ${scrolled? "text-gray-700 ml-220 font-semibold gap-8" : "text-white font-semibold gap-12"}`}>
                        <li>Cek Pesanan</li>
                        <li>Promo</li>
                        <li>Mitra Bus</li>
                    </ul>
                </div>

                <div className={`p-2.5 w-24 flex justify-center font-semibold rounded-full hover:bg-gray-300 ${scrolled? "bg-red-700 hover:bg-red-600 text-white mr-12 shadow-2xl" : "text-red-800 bg-white"}`}>
                    <button type="button" onClick={() => setOpenLogin(true)}>Masuk</button>
                </div>

                <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} onOpenRegister={showRegister} />
                <SignUp open={openRegister} onClose={() => setOpenRegister(false)} onOpenLogin={showLogin} />
            </div>

            {scrolled && (
                <div className="fixed top-15 left-8 z-20 flex items-center transition-all duration-100 ease-in-out backdrop-blur-3xl bg-white/5 mt-4 pl-2 px-4 py-1 rounded-full border border-gray-200 shadow-sm">
                    <p className="text-xs font-semibold text-white">OFFICIAL PARTNER 500+ PO BUS</p>
                </div>
            )}
        </div>
    )
}

export default Navbar

