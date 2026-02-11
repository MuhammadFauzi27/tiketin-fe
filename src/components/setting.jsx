import { useAuth } from "../context/useAuth";
import { useState, useMemo} from "react";
import toast from "react-hot-toast";


function Setting(){
    const {user, updateProfile} = useAuth()

    const initialForm = useMemo(() => ({
        gender: user?.gender || "",
        dobDay: user?.dobDay || "",
        dobMonth: user?.dobMonth || "",
        dobYear: user?.dobYear || "",
        city: user?.city || "",
    }), [user])

    const [form, setForm] = useState(initialForm)
    const [dirty, setDirty] = useState(false)

    const view = dirty ? form : initialForm;

    const onChange = (key) => (e) => {
        setDirty(true);
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        updateProfile(view);
        setDirty(false);
        toast.success("Berhasil disimpan");
    };

    const handleMaybeLater = () => {
        setForm(initialForm)
        setDirty(false)
    };

    return(
    <div className="w-full">
        <div className="mb-5">
            <h1 className="text-4xl font-bold text-red-700">Settings</h1>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className=" px-6 py-4">
                <p className="text-2xl font-bold text-black">Data Pribadi</p>
            </div>

            <div className="px-6 py-6">
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-semibold text-gray-700"> Full Name</label>
                    <p className="border border-gray-200 p-2.5 rounded-2xl">{user.fullName.charAt(0).toUpperCase() + user?.fullName?.slice(1)}</p>
                </div>
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">jenis Kelamin</label>
                        <select value={view.gender} onChange={onChange("gender")} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500">
                            <option value="">Pilih Jenis Kelamin</option>
                            <option>Laki Laki</option>
                            <option>Perempuan</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Tanggal Lahir</label>
                        <div className="grid grid-cols-3 gap-3">
                            <select value={view.dobDay} onChange={onChange("dobDay")} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500">
                                <option value="">DD</option>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                                    <option key={d} value={d}>
                                        {String(d).padStart(2, "0")}

                                    </option>
                                ))}
                            </select>

                            <select value={view.dobMonth} onChange={onChange("dobMonth")} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500">
                                <option value="">MM</option>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                        <option key={m} value={m}>
                                            {String(m).padStart(2, "0")}
                                        </option>
                                    ))}
                                </select>

                            <select value={view.dobYear} onChange={onChange("dobYear")} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500">
                                <option value="">YYYY</option>
                                {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Kota tempat tinggal</label>
                    <input value={view.city} onChange={onChange("city")} type="text" placeholder="City of Residence" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500"/>
                </div>    

                <div className="flex items-center justify-end gap-3">
                    <button onClick={handleMaybeLater} type="button" className="rounded-xl hover:bg-gray-400 bg-gray-500 px-5 py-2.5 text-sm font-semibold text-white">
                        Batal
                    </button>
                    <button type="button" onClick={handleSave} className="rounded-xl hover:bg-red-500 bg-red-600 px-5 py-2.5 text-sm font-semibold text-white">
                        Simpan
                    </button>
                </div>
            </div>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4">
                <div>
                    <p className="text-base font-bold text-gray-900">Email</p>
                </div>
            </div>

            <div className="px-6 py-5">
                <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3">
                    <p className="font-semibold text-red-700">fauzi@gmail.com</p>
                </div>
            </div>
        </div>
    </div>
  );
}


export default Setting