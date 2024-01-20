import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
    try {
        const { email, password, name, confirmPassword } = await request.json();
        console.log(email, password, name, confirmPassword);
        const hashedPassword = await hash(password, 10);
        try {
            //TODO: Check if user already exist
            await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    name: name,
                },
            });
        } catch(e) {
            console.log({error: e});
        }

    } catch (error: any) {
       console.log({error});
    }

    return NextResponse.json({message: 'success'});
}