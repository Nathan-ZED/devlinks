"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"


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
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    }).max(50, {
        message: 'Username must be 50 characters max'
    }),
});

export default function Register() {

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: ""
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(values)
            }).then(res => {
                toast({
                    description: res.statusText,
                })
            })
        } catch (error : any) {
            console.log({ error })
            toast({
                title: "Uh oh! Something went wrong.",
                description: "The message has not been sent.",
            })
        }
    }


    return (
        <main className="py-5">
            <div className="flex flex-col items-start gap-y-2 mb-5">
                <h1 className="text-2xl font-bold text-slate-800">Create an account</h1>
                <p className="text-md text-slate-500">Let’s get you started sharing your links!</p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mb-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <Button type="submit" className="w-full py-4">Submit</Button>
                </form>
            </Form>
            <div className="space-y-1 flex flex-col items-center">
                <span className="text-sm text-slate-500">Already have an account?</span>
                <Link className="text-sm text-primary" href="/login">Login</Link>
            </div>
            <Toaster />
        </main>
    );
}