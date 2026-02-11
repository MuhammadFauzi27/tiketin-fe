import {TestimoniData} from '../services/data/dummy'
import { useEffect, useState, useRef } from 'react';
import {Star} from 'lucide-react'

function TestimoniTiket(){
    const testiRef = useRef(null);
    const [testiIndex, setTestiIndex] = useState(0);

    useEffect(() => {
        const total = TestimoniData.length;
        const id = setInterval(() => {
            setTestiIndex((prev) => (prev + 1) % total);
        }, 3000);

        return () => clearInterval(id);
    }, [TestimoniData.length]);

    useEffect(() => {
        const el = testiRef.current;
        if (!el) return;

        const first = el.querySelector("[data-testi-card='true']");
        if (!first) return;

        const cardWidth = first.clientWidth;
        const styles = window.getComputedStyle(el);
        const gap = parseFloat(styles.columnGap || styles.gap || "0") || 20;

        el.scrollTo({
            left: testiIndex * (cardWidth + gap),
            behavior: "smooth",
        });
    }, [testiIndex]);

    return(
        <div className="mx-auto max-w-7xl mt-32 px-6 m-32">
            <p className="text-red-700 text-5xl mb-16 text-center font-bold">Testimoni</p>

            <div className="mt-8 relative">
                <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-gray-50 to-transparent z-10" />

                <div ref={testiRef} className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3" style={{ scrollbarWidth: "none" }}>
                    {TestimoniData.map((t) => (
                        <div key={t.name} data-testi-card="true" className="min-w-[320px] md:min-w-[360px] snap-start rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={18} className={ i < t.rating? "fill-yellow-400 text-yellow-400": "text-gray-300" }/>
                                    ))}
                                </div>
                            </div>

                            <p className="mt-4 text-gray-800 leading-relaxed">“{t.text}”</p>
                            <p className="mt-5 font-bold text-gray-900">{t.name}</p>
                        </div>
                     ))}
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                    {TestimoniData.map((_, i) => (
                        <div key={i} className={`h-2.5 rounded-full transition-all ${ i === testiIndex ? "w-8 bg-red-700" : "w-2.5 bg-gray-300"}`}/>
                    ))}
                </div>
          </div>
        </div>
    )
}

export default TestimoniTiket