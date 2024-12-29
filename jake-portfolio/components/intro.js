import Image from "next/image";

export default function intro() {
    return (
        <div className="flex font-mono">
        <div className="flex-none w-48 min-h-56 relative">
            <img src="/images/placeholder_icon.png" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-auto p-6">
            <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold text-stone-900">
                Hi, I'm Jake
            </h1>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                and this is my website. 
            </div>
            </div>
        </div>
        </div>
)}