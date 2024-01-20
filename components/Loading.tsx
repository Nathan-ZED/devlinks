import { LuLoader2 } from "react-icons/lu";


export default function Loading() {
    return (
        <div className="w-full py-5 flex items-center justify-center flex-col space-y-4">
            <LuLoader2 className="spin-infinite text-3xl text-primary" />
            <span className="text-xl font-medium text-primary">Loading your links</span>
        </div>
    )

}