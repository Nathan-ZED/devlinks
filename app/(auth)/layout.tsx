import Image from "next/image";
import '../globals.css'
import { Instrument_Sans } from 'next/font/google'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })


export default async function AuthLayout({children}: {
    children: React.ReactNode
}) {

    const session = await getServerSession();

    if(session) {
        redirect('/');
    }

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
