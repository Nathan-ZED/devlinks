import * as z from "zod"
import Link from "next/link";
import Form from "./form"

export default async function Register() {

    return (
        <main className="py-5 min-h-screen flex items-center justify-center">
            <div>
                <div className="flex flex-col items-start gap-y-2 mb-5">
                    <h1 className="text-2xl font-bold text-slate-800">Create an account</h1>
                    <p className="text-md text-slate-500">Add your details below to get back into the app</p>
                </div>
                    <Form />
                <div className="space-y-1 flex flex-col items-center">
                    <span className="text-sm text-slate-500">Already have an account ?</span>
                    <Link className="text-sm text-primary" href="/login">Login</Link>
                </div>
            </div>
        </main>
    );
}