import Link from "next/link";
import Image from "next/image";
import { FaLink, FaRegCircleUser, FaRegEyeSlash } from "react-icons/fa6";


export default function Navbar() {
    return (
        <nav className="py-3 border-b-[1px] border-slate-300">
            <div className="container">
                <div className="flex items-center justify-between w-full">
                    <Link href="/" className="flex items-center gap-x-3">
                        <Image src="/images/logo.svg" alt="logo" width={36} height={36} />
                        <span className="font-bold text-xl hidden md:block">devlinks</span>
                    </Link>
                    <div className="flex items-center gap-x-5">
                        <Link href="/links" className="text-slate-500 px-3 h-[42px] flex items-center gap-x-1">
                            <FaLink className="text-xl" />
                            <span className="text-md hidden md:block">Links</span>
                        </Link>
                        <Link href="/profile" className="text-slate-500 px-3 h-[42px] flex items-center gap-x-1">
                            <FaRegCircleUser className="text-lg" />
                            <span className="text-md hidden md:block">Profile</span>
                        </Link>
                    </div>
                    <Link href="/profile" className="text-slate-500 md:text-primary flex px-3 h-[42px] rounded-[8px] items-center justify-center border-[1px] border-slate-500 md:border-primary">
                        <FaRegEyeSlash className="text-lg md:hidden" />
                        <span className="text-md hidden md:block">Preview</span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}