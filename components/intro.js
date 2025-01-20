import Image from "next/image";

export default function intro() {
    return (
        <div className="flex justify-center items-center w-auto h-auto font-mono">
            <div className="flex w-48 min-h-56 relative">
                <img src="/images/placeholder_icon.png" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-auto p-6">
                <div className="flex flex-wrap">
                <h1 className="flex-auto text-lg font-semibold text-stone-900">
                    Hi, I'm Jake
                </h1>
                <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                    <p>and this is my website. I am a recent graduate of Gettysburg College</p>
                    <p>with a major in Computer Science and a minor in Spanish. Here you will</p>
                    <p>find some of my college projects as well as my personal projects.</p>
                    <p>Feel free to explore, check out my resume, or even get in touch!</p>
                </div>
                </div>
            </div>
        </div>
)}