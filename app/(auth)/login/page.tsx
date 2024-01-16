"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email(),
});

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }


    return (
        <main className="py-5">
            <div className="flex flex-col items-start gap-y-2 mb-5">
                <h1 className="text-2xl font-bold text-slate-800">Login</h1>
                <p className="text-md text-slate-500">Add your details below to get back into the app</p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mb-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full py-4">Login</Button>
                </form>
            </Form>
            <div className="space-y-1 flex flex-col items-center">
                <span className="text-sm text-slate-500">Don't have an account?</span>
                <Link className="text-sm text-primary" href="/register">Create an account</Link>
            </div>
        </main>
    );
}