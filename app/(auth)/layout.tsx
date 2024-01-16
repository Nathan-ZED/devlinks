import Image from "next/image";
import '../globals.css'
import { Instrument_Sans } from 'next/font/google'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })


export default function AuthLayout({children}: {
    children: React.ReactNode
}) {
    return (
            <div className="container py-4">
                <div className="flex items-center justify-start gap-x-2">
                    <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
                    <span className="font-bold text-3xl">devlinks</span>
                </div>
                {children}
            </div>
    )
}
