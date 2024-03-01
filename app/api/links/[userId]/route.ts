import { Link } from "@/app/(app)/page";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}: {params: {userId: string}}) {
        const {userId} = params;
        const links = await prisma.link.findMany({
            where: {userId: parseInt(userId)}
        })
        return NextResponse.json(links);
}
