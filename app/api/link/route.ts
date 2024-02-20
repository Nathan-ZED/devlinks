import { Link } from "@/app/(app)/page";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {

    const { platform, link, userId } = await req.json();
    const dbPlatform = await prisma.platform.findFirst({
        where: {name:platform}
    })

    if(dbPlatform) {
        const alreadyExistingLink = await prisma.link.findFirst({
            where: {userId: userId, platformId: dbPlatform.id}
        })

        if(alreadyExistingLink) {
            return NextResponse.json({
                status: 402,
                error: `You already got a ${dbPlatform.name} link`
            });
        }
        
        await prisma.link.create({
            data: {
                name: dbPlatform.name,
                url: link,
                platformId: dbPlatform.id,
                userId: userId,
            }
        })
        const links = await prisma.link.findMany({
            where: {userId: userId}
        })
        return NextResponse.json(links);
    }

    return NextResponse.json({message: 'This platform does not exist'});
}

export async function DELETE(req: Request) {
    const {id, userId} = await req.json();
    await prisma.link.delete({
        where: {id: id}
    });
    const links = await prisma.link.findMany({
        where: {userId: userId}
    })

    return NextResponse.json(links);
}

export async function PUT(req: Request, res: Response) {
    const {linksToEdit} = await req.json();
    console.log(linksToEdit);
    linksToEdit.forEach(async (link:Link, i:number) => {
        await prisma.link.update({
            where: {id:link.id},
            data: {
                order: link.order,
            }
        });
    })

    return NextResponse.json({message: 'Okay'});
}