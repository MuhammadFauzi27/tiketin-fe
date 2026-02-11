import Image from '../../assets/image-bus.jpg'
import {Bus, ArrowDownUp, CalendarFold, Users, ArrowRight, CircleCheckBig, Star, Gift, Copy, ChevronLeft, ChevronRight} from "lucide-react"
import { useEffect, useState, useRef} from 'react'
import {Kategori, Pesan, Coupons} from '../../services/data/dummy.jsx'
import Testimoni from '../../components/testimoni.jsx'
import { useNavigate } from 'react-router-dom'
import { DataKota } from '../../services/data/busData.jsx'


function LandingPage(){

    const [scrolled, setScrolled] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60)
        }

        window.addEventListener('scroll', handleScroll, {passive : true})
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const today = new Date().toISOString().split("T")[0]
    const [date, setDate] = useState(today)

    const [open, setOpen] = useState(false)
    const [seat, setSeat] = useState(1)
    const ref = useRef(null)
    
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        };
    
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler);
    }, [])

    const slider = useRef(null)

    const scrollLeft = () => {
        slider.current?.scrollBy({left: -420, behavior: "smooth"})
    }

    const scrollRight = () => {
        slider.current?.scrollBy({left: 420, behavior: "smooth"})
    }

    const [copy, setCopy] = useState(null)

    const handleCopy = async(text, index) => {
        try{
            await navigator.clipboard.writeText(text)
            setCopy(index)
        } catch{
            const ta = document.createElement("textarea")
            ta.value = text
            document.body.appendChild(ta)
            ta.select()
            document.execCommand("copy")
            document.body.removeChild(ta)

            setCopy(index)
            setTimeout(() => setCopy(null), 1200)
        }
    }

    const [fromQuery, setFromQuery] =  useState("")
    const [toQuery, setToQuery] = useState("")

    const [fromOpen, setFromOpen] = useState(false)
    const [toOpen, setToOpen] = useState(false)

    const [fromSelected, setFromSelected] = useState(null)
    const [toSelected, setToSelected] = useState(null)

    const filterCities = (q) => {
        const query = q.trim().toLowerCase();
        if (!query) return [];
        return DataKota.filter((c) => `${c.name} ${c.province}`.toLowerCase().includes(query)).slice(0, 8); // batasi 8 biar rapi
    };

    const fromResults = filterCities(fromQuery);
    const toResults = filterCities(toQuery);

    const pickFrom = (city) => {
        setFromSelected(city);
        setFromQuery(`${city.name}`);
        setFromOpen(false);
    };

    const pickTo = (city) => {
        setToSelected(city);
        setToQuery(`${city.name}`);
        setToOpen(false);
    }


    const sameCity = Boolean( fromSelected?.id && toSelected?.id && fromSelected.id === toSelected.id)
    const cityError = sameCity ? "Kota asal dan tujuan tidak boleh sama." : "";
    
    const canSearch = fromSelected && toSelected && !sameCity;

    return(
        <div>
            <div id='pesan-tiket' className='relative'>
                <img src={Image} alt="bg" className='h-screen w-full object-cover'/>
                <div className='bg-black/50 inset-0 absolute h-screen'></div>
                <div className="absolute h-screen inset-0 bg-gradient-to-r from-red-800/90 via-red-700/60 to-transparent"></div>

                <div className='absolute top-[100px] flex w-full justify-center items-center flex-col lg:flex-row px-6 sm:px-10 lg:px-0 gap-10 lg:gap-0'>
                    <div className={`flex flex-col mr-[300px] sm:mr-64 text-white lg:pl-24 ${scrolled? "relative" : ""} max-w-2xl`}>
                        <div className={`flex  gap-2.5 bg-white/10 w-[350px] sm:w-fit pt-1 pb-1 pl-8 pr-8 rounded-full backdrop-blur-3xl border border-white/30 ${scrolled? "translate-x-0" : "translate-x-0"}`}>
                            <Star className='fill-yellow-300 text-yellow-300'/>
                            <p className={`font-semibold`}>OFFICIAL PARTNER  500+ PO BUS</p>
                        </div>
                        <p className='text-4xl sm:text-5xl lg:text-7xl mb-4 font-bold leading-tight'>Pesan Tiket Bus <br/>Gak Pake Ribet.</p>
                        <p className='text-base sm:text-lg'>Platform tiket bus #1 buat Gen Z. Pilih kursi, bayar sat-set, langsung<br/>berangkat. Tanpa antre, tanpa drama.</p>
                        
                        <div className='flex flex-wrap gap-2.5 mt-4 h-fit w-fit'>
                            <div className='flex justify-center border border-white/25 items-center gap-2 p-2.5 rounded-full w-fit bg-black/20 backdrop-blur-3xl'>
                                <CircleCheckBig size={15} className='text-green-500'/>
                                <p className='text-xs'>Jaminan Kursi</p>
                            </div>

                            <div className='flex gap-2 justify-center border border-white/25 items-center p-2.5 w-fit bg-black/20 rounded-full backdrop-blur-2xl'>
                                <CircleCheckBig size={15} className=' text-green-500'/>
                                <p className='text-xs'>Pasti Aman</p>
                            </div>
                        </div>
                    </div>

                    <div className='mr-0 lg:mr-40 lg:mt-12 h-auto lg:h-115 flex flex-col gap-2.5 w-full sm:w-[420px] p-2.5 lg:w-105 bg-gray-100 rounded-3xl mx-auto lg:mx-0'>
                        <div className=' p-2.5 flex top-6 sm:gap-32 justify-between items-center'>
                            <p className='text-2xl sm:text-3xl font-bold mt-2.5 ml-2.5'>Cari Tiket</p>
                            <p className='text-xs font-semibold mr-2. text-green-800 bg-green-200 p-2 rounded-2xl'>Online 24 jam</p>
                        </div>

                        <div className='text-gray-600 p-4 w-full'>
                            <form action="">
                                <label htmlFor="" className='flex flex-col gap-2'>
                                    <p className='font-semibold text-sm'>Dari Mana</p>
                                    <div className='relative'>
                                        <Bus className='absolute top-2.5 left-4' size={20}/>
                                        <input type="text" value={fromQuery} onChange={(e) => {setFromQuery(e.target.value)}} onFocus={() => setFromOpen(true)} onBlur={() => setTimeout(() => setFromOpen(false), 120)} name="" id="" className='h-10 bg-white border-white w-full pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500' placeholder='Pilih Lokasi Keberangkatan'/>
                                        {fromOpen && fromResults.length > 0 && (
                                            <div className="absolute w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                                                {fromResults.map((city) => (
                                                    <button type='button' key={city.id} onMouseDown={(e) => e.preventDefault()} onClick={() => pickFrom(city)} className='w-full text-left px-4 py-2.5 hover:bg-gray-100'>
                                                        <p className='font-semibold text-gray-900'>{city.name}</p>
                                                        <p className='text-xs text-gray-500'>{city.province}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {fromOpen && fromQuery.trim() && fromResults.length === 0 && (
                                            <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 px-4 py-3 text-sm text-gray-500">
                                                Kota tidak ditemuka...
                                            </div>
                                        )}
                                    </div>
                                    {cityError && (
                                        <p className="text-xs font-semibold text-red-500">
                                        {cityError}
                                    </p>
                                    )}

                                </label>

                                <label htmlFor="tujuan" className='flex mt-8 flex-col gap-2'>
                                    <div className='flex justify-between'>
                                        <p className='font-semibold text-sm'>Mau Kemana</p>
                                        <ArrowDownUp className='mr-2.5' size={20}/>
                                    </div>
                                    <div className='relative'>
                                        <Bus className='absolute top-2.5 left-4 transform -scale-x-100' size={20}/>
                                        <input type="text" name="" id="tujuan" value={toQuery} onChange={(e) => {setToQuery(e.target.value); setToOpen(true)}} onFocus={() => setToOpen(true)} onBlur={() => setTimeout(() => setToOpen(false), 120)} className='h-10 bg-white border-white w-full pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500' placeholder='Mau Kemana? '/>
                                        
                                        {toOpen && toResults.length > 0 && (
                                            <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                                                {toResults.map((city) => (
                                                    <button key={city.id} type='button' onMouseDown={(e) => e.preventDefault()} onClick={() => pickTo(city)} className='w-full flex flex-col text-left px-4 py-2.5 hover:bg-gray-100'>
                                                        <p className="font-semibold text-gray-900">{city.name}</p>
                                                        <p className="text-xs text-gray-500">{city.province}</p>
                                                    </button>
                                                ))}

                                                {toOpen && toQuery.trim() && toResults.length === 0 && (
                                                    <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 px-4 py-3 text-sm text-gray-500">
                                                        Kota tidak ditemukan
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </label>

                                <div className='flex justify-around items-center mt-4 gap-2.5'>
                                    <label htmlFor="" className='flex flex-col gap-2 w-1/2'>
                                        <p className='font-semibold text-sm mt-2'>Tanggal</p>
                                        <div className='relative'>
                                            <CalendarFold className='absolute left-4 top-2.5' size={20}/>
                                            <input type="date" name="" id="" value={date} onChange={(e) => setDate(e.target.value)} className='h-10 bg-white border-white w-full pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'/>
                                        </div>
                                    </label>

                                    <label className="flex flex-col gap-2 w-1/2">
                                        <p className="font-semibold text-sm mt-2">Kursi</p>
                                        <div ref={ref} className="relative">
                                            <Users className="absolute left-4 top-2.5 text-black" size={20} />
                                            <input type="text" value={`${seat} Kursi`} readOnly onClick={() => setOpen((v) => !v)} className='h-10 bg-white border-white w-full pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'/>

                                            {/* Dropdown bawah */}
                                            <div className={`absolute left-0 top-full mt-2 w-full bg-white rounded-xl transition-all duration-500 ease-out origin-top z-50 ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"} `}>
                                                {[1, 2, 3, 4].map((seatNumber) => (
                                                    <button key={seatNumber} type="button" onClick={() => { setSeat(seatNumber); setOpen(false); }} className={` w-full px-4 py-2 text-left  ${seat === seatNumber ? " font-semibold" : ""} `}>
                                                        {seatNumber}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </form>

                        </div>

                        <button type='button' disabled={!canSearch} onClick={() => { if (!canSearch) return; const payload = { from: fromSelected, to: toSelected, date, seat }; localStorage.setItem("last_search", JSON.stringify(payload)); navigate("/cari-bus", { state: payload });}} className={`p-2.5 m-4 w-97 rounded-2xl flex justify-center items-center gap-2.5 font-semibold text-lg ${canSearch ? "bg-red-700 hover:bg-red-600 text-white shadow-[0_0_8px_rgba(185,28,28,0.6)]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                            <p className='font-semibold text-lg'>Cari Tiket</p>
                            <ArrowRight/>
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex justify-center flex-col sm:flex-row ml-4 mr-4 items-center sm:mr-8 sm:ml-8 gap-2.5  mt-16 mb-16'>
                {Kategori.map((item) => (
                    <div key={item.title} className=' flex border h-24 shadow-xl justify-center pr-4 items-center w-[350px] rounded-2xl p-4 border-gray-200 gap-4 w-62'>
                        <item.icon size={32} className='text-red-700'/>
                        <div className='flex flex-col sm:justify-center'>
                            <p className='text-xl font-bold'>{item.title}</p>
                            <p className='font-semibold text-gray-700'>{item.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-24 mb-12'>
                <div className='flex justify-center items-center flex-col gap-2.5'>
                    <div className='flex ml-16 mr-24'>
                        <div className='flex flex-col'>
                            <div className=' flex sm:mr-[700px] items-center gap-4'>
                                <Gift size={32}/>
                                <p className='text-3xl font-bold'>Kupon 25% untuk pengguna baru</p>
                            </div>
                            <p className='text-lg ml-4 mt-2.5 font-semibold'>Valid untuk transaksi pertama kali di <span className='text-red-700'>TiketIn</span></p>
                        </div>
                    
                        <div className='flex items-center gap-4'>
                            <button onClick={scrollLeft} className='border hover:bg-gray-200 flex justify-center items-center h-12 border-gray-200 rounded-full w-12'><ChevronLeft/></button>
                            <button onClick={scrollRight} className='border hover:bg-gray-200 flex justify-center items-center h-12 border-gray-200 rounded-full w-12'><ChevronRight/></button>
                        </div>
                    </div>

                    <div className="relative ml-32 mr-32 mx-auto max-w-[1250px]">
                        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10
                            bg-gradient-to-r from-white via-white/90 to-transparent z-10" />

                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10
                            bg-gradient-to-l from-white via-white/90 to-transparent z-10" />


                        <div ref={slider} className='overflow-x-auto no-scrollbar  max-w-[500px] sm:max-w-[1500px] mx-auto'>
                            <div className='flex flex-nowrap items-center justify-center gap-6 w-max px-10'>
                                {Coupons.map((item, index) => (
                                    <div key={index} className='flex justify-center shadow-2xl mb-8 shadow-black/10 rounded-2xl flex-shrink-0 snap-start flex-col w-[450px] mt-12 border bg-white gap-4 border-gray-300 p-8'>
                                        <div className='flex gap-4 items-center text-black'>
                                            <item.icon size={64} className='bg-green-400/20 p-2.5 w-24 rounded-xl backdrop-blur-3xl border border-green-100'/>
                                            <p className='text-lg font-bold '>{item.title}</p>
                                        </div>
                                        <p className='text-sm font-semibold text-gray-700'>{item.subtitle}</p>
                                        <div className="h-px flex-1 bg-gray-900"></div>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center bg-gray-100 p-2.5 rounded-xl w-[300px] gap-4'>
                                                <Copy/>
                                                <p>{item.code}</p>
                                            </div>
                                            <button onClick={() => handleCopy(item.code, index)} className='bg-red-100 p-2.5 w-[80px] rounded-2xl backdrop-blur-2xl text-red-700 font-semibold hover:bg-red-200'>{copy === index ? "Copied" : "Copy"}</button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify- items-center mt-24 flex-col gap-8'>
                <div className='flex gap-2.5 items-start flex-col ml-6 sm:mr-[800px] sm:text-left'>
                    <p className='text-ls font-semibold text-red-700'>Cara Pesan</p>
                    <p className='text-5xl mb-2 font-bold'><span className='text-red-700'>3 Langkah</span>,<br/> langsung berangkat</p>
                    <p className='text-lg font-semibold text-gray-700'>Atur perjalananmu langsung dari HP, cepat dan praktis.</p>
                </div>
                <div className='flex w-full flex-col gap-8  sm:flex-row p-4 justify-center items-stretch '>
                    {Pesan.map((item, index) => (
                        <div key={index} className='flex shadow-2xl flex-col border max-w-[420px] sm:w-[450px]  border-gray-100 p-8 rounded-2xl'>
                            <item.icon className='border border-red-200 p-2.5 bg-red-600/40 rounded-xl backdrop-blur-lg text-red-900' size={62}/>
                            <p className='text-xl font-bold mt-4'>{item.title}</p>
                            <p className='font-semibold mt-2'>{item.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Testimoni/>

            <div className='flex sm:justify-between gap-12 justify-between sm:flex-row items-center border border-gray-200 h-[100px]'>
                <p className='text-5xl text-red-700 ml-2.5 sm:ml-24 font-bold'>TiketIn</p>
                <p className='text-sm mr-2.5 sm:mr-24 text-gray-700 font-semibold'>&copy;, 2026 TiketIn. All right reserved</p>
            </div>
        </div>
    )
}

export default LandingPage