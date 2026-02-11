import {Search, MoveRight, Minus, BusFront, Star, SlidersHorizontal} from 'lucide-react'
import {DataBus} from '../services/data/busData'
import { useLocation } from "react-router-dom";
import { useState} from "react";
import { useNavigate } from 'react-router-dom';


function Cari(){

    const location = useLocation()
    const state = location.state || {}
    const from = state.from || null
    const to = state.to || null
    const date = state.date || ""
    const seat = state.seat || 0
    
    const [sortBy, setSortBy] = useState(null)
    const [priceFilter, setPriceFilter] = useState(null)
    const [rating45, setRating45] = useState(false)
    const [seatMoreThan2, setSeatMoreThan2] = useState(false)
    const navigate = useNavigate()

    const fromName = from?.name ?? ""
    const toName = to?.name ?? ""

    let filteredBus = []

    if (fromName && toName) {
        filteredBus = DataBus.filter((bus) =>
            bus.from.toLowerCase() === fromName.toLowerCase() &&
            bus.to.toLowerCase() === toName.toLowerCase()
        )
    }

    // filter rute
    if (fromName && toName) {
        filteredBus = filteredBus.filter(
            (bus) =>
            bus.from.toLowerCase() === fromName.toLowerCase() &&
            bus.to.toLowerCase() === toName.toLowerCase()
        );
    }

    // filter rating > 4.5
    if (rating45) {
        filteredBus = filteredBus.filter((bus) => bus.rating > 4.5)
    }

    // filter kursi > 2
    if (seatMoreThan2) {
        filteredBus = filteredBus.filter((bus) => bus.seatsLeft > 2)
    }

    // filter harga
    if (priceFilter === "low") {
        filteredBus = filteredBus.filter((bus) => bus.price < 150000)
    }

    if (priceFilter === "high") {
        filteredBus = filteredBus.filter((bus) => bus.price >= 150000)
    }

    // sorting
    if (sortBy === "cheap") {
        filteredBus.sort((a, b) => a.price - b.price)
    }

    if (sortBy === "rating") {
        filteredBus.sort((a, b) => b.rating - a.rating)
    }

    const handleReset = () => {
        setSortBy(null)
        setPriceFilter(null)
        setRating45(false)
        setSeatMoreThan2(false)
    };  

    const handleGoDetail = (bus) => {
        navigate("/detail-bus", {
        state: { bus, from, to, date, seat },
        });
    }


    return(
        <div className="mt-6 max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-12 gap-6">
                <div className=" col-span-4">
                    <div className='bg-white sticky top-20 shadow-xl flex flex-col border border-gray-200 p-4 rounded-2xl'>
                        <div className='flex items-center ml-2.5 gap-2.5 mt-4'>
                            <SlidersHorizontal className='text-red-700'/>
                            <p className="text-3xl font-bold">Filter</p>
                        </div>
                        <p className="font-semibold ml-2.5 text-gray-700 text-sm mt-1">Menampilkan hasil berdasarkan kategori yang Anda pilih</p>
                        <div className="flex font-semibold mt-2.5 mb-2 justify-between">
                            <p className="ml-2">Urutkan</p>
                            <button type="button" onClick={handleReset} disabled={!sortBy && !priceFilter && !rating45 && !seatMoreThan2} className={`mr-4 font-semibold ${!sortBy && !priceFilter && !rating45 && !seatMoreThan2 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-red-700" }`}>
                                Reset
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4 justify-center">
                            {[["cheap", "Termurah"], ["rating", "Rating"], ["low", "< Rp 150.000"], ["high", "≥ 150.000"]].map(([index, label]) => (
                                <button key={index} onClick={() => { if (index === "cheap" || index === "rating") setSortBy(index); else setPriceFilter(index);}} className={`border rounded-2xl h-12 font-semibold ${ sortBy === index || priceFilter ===index ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-red-200" }`}>
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div>
                            <div className="mt-6 mb-8">
                                <label htmlFor="rating" className="flex items-center justify-between h-16 mt-4 border border-gray-300 p-2.5 rounded-2xl">
                                    <p className="font-semibold  text-red-700 ml-2">Rating lebih dari 4.5</p>
                                    <input type="checkbox" checked={rating45} onChange={(e) => setRating45(e.target.checked)} name="" id="rating" className="h-4 w-4 mr-2.5 accent-red-500"/>
                                </label>

                                <label htmlFor="kursi" className="flex items-center justify-between h-16 mt-4 border border-gray-300 p-2.5 rounded-2xl">
                                    <p className="font-semibold text-red-700 ml-2">Kursi tersedia lebih dari 2</p>
                                    <input type="checkbox" checked={seatMoreThan2} onChange={(e) => setSeatMoreThan2(e.target.checked)} id="kursi" className="h-4 w-4 mr-2.5 accent-red-500"/>
                                </label>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-8 min-w-0">
                    <div className="bg-white rounded-2xl border z-50 border-gray-200 p-3 flex items-center justify-between gap-4">
                        <div className='flex items-center gap-3 flex-wrap'>
                            <Search className='text-red-700'/>
                            <p className='font-bold text-2xl'>{from?.name}</p>
                            <MoveRight className='text-red-700'/>
                            <p className='font-bold text-2xl'>{to?.name}</p>
                            <Minus className='rotate-90 text-red-700'/>
                            <p className='font-semibold'>{date ? new Date(date).toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }) : "-"}</p>
                            <Minus className='rotate-90 text-red-700'/>
                            <p className='font-semibold'>{seat} Kursi</p>
                        </div>

                        <div className='mr-4'>
                            <button onClick={() => navigate('/home')} className='font-semibold bg-red-200/60 hover:bg-red-300 p-2.5 rounded-2xl w-24'>Cari Rute</button>
                        </div>

                    </div>
                    <div>
                        <p className='text-lg m-4 font-semibold text-gray-800'>Pilih keberangkatan yang paling pas</p>
                    </div>

                    <div className='flex flex-col gap-4'>

                        {filteredBus.length === 0 && (
                            <div className="bg-white border text-center border-gray-200 rounded-2xl p-6 text-gray-600 font-semibold">
                                {fromName && toName ? (
                                    <p>Tidak ada bus untuk rute {fromName} → {toName}.</p>
                                ) : (
                                    <p>Cari rute terlebih dahulu.</p>
                                )}  
                            </div>
                        )}
                        {filteredBus.map((bus) => (
                            <button key={bus.id} type='button' onClick={() => handleGoDetail(bus)} className='border border-gray-200 shadow-lg bg-white p-4 rounded-2xl'>
                                <div className='flex justify-between mb-2.5'>
                                   <div className='flex gap-4 items-center mb-2'>
                                        <BusFront/>
                                        <p className='font-semibold bg-red-100 p-1 w-32 text-center rounded-xl text-red-800'>{bus.po}</p>
                                   </div>

                                    <div>
                                        <p className='text-gray-700 font-semibold'>{bus.kelas}</p> 
                                        <div className='flex items-center gap-2.5 justify-end'>
                                            <Star size={16} className='fill-yellow-300 text-yellow-300'/>  
                                            <p className='font-semibold'>{bus.rating}</p>
                                        </div>
                                    </div>      
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex justify-around gap-4'>
                                        <p className='text-3xl font-bold'>{bus.depart}</p>
                                        <div className='flex flex-col'>
                                            <p className='font-semibold text-gray-700'>{bus.duration}</p>
                                            <div className="mt-2 h-[2px] w-full bg-gray-200 relative">
                                                <div className="absolute left-0 top-0 h-[2px] w-1/2 bg-red-700" />
                                            </div>
                                        </div>
                                        <p className='text-3xl font-bold'>{bus.arrive}</p>
                                    </div>

                                    <p className={`text-sm font-semibold ${bus.seatsLeft <= 5? " text-red-600" : "text-green-600"}`}>Kursi Tersisa {bus.seatsLeft}</p>
                                </div>

                                <div className='flex text-xs font-semibold text-gray-500 items-center justify-between'>
                                    <div className='flex items-center gap-24 ml-2.5'>
                                        <p>{bus.from}</p>
                                        <p>{bus.to}</p>
                                    </div>
                                </div>

                               <div className='flex justify-between mt-4 font-semibold'>
                                    <div className='flex gap-2'>
                                        {bus.tags.map((items) => (
                                            <p key={items} className='text-green-700/90 text-xs h-fit bg-gray-200/40 rounded-xl w-fit text-center p-2'>{items}</p>
                                        ))}
                                    </div>

                                    <div className='flex flex-col items-end mt-2'>
                                            <p className='font-bold text-2xl'>IDR {bus.price.toLocaleString('id-ID')}</p>
                                            <p className='text-xs font-semibold text-gray-600'>/ Pax</p>
                                    </div>
                               </div>

                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cari