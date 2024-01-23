import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, res: Response) {
    const platforms = await prisma.platform.findMany();
    return NextResponse.json(platforms);
}
