import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name } = body;
        const user = await prisma.user.create({
            data: { email, name }
        });
        return new NextResponse(null, {
            status: 200,
            statusText: 'Account created !',
        })
    } catch (error: any) {
        if(error.code === 'P2002') {
            return new NextResponse(null, {
                status: 500,
                statusText: 'This email is already in use',
            })
        }
    }
}