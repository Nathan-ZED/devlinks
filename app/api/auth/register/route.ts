import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password, name, confirmPassword } = await request.json();
        console.log(email, password, name, confirmPassword);
        const hashedPassword = await hash(password, 10);
        try {
            const user = await prisma.user.create({
                data: {
                  email: email,
                  password: hashedPassword,
                  name: name,
                },
              });
        } catch(e) {
            console.log({e});
        }

    } catch (error: any) {
       console.log({error});
    }

    return NextResponse.json({message: 'success'});
}