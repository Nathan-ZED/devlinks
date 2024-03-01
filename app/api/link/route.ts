import { Link } from "@/app/(app)/page";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
    const { platform, link, userId } = await req.json();
        const links = await prisma.link.findMany({
            where: {userId: userId}
        });
        const linkDB = await prisma.link.create({
            data: {
                name: platform,
                url: link,
                userId: userId,
                order: links.length + 1,
            }
        });
        return NextResponse.json(linkDB);
}

export async function DELETE(req: Request) {
    const {id, userId} = await req.json();
    const linkToDelete = await prisma.link.findUnique({
        where: {id: id}
    });
    const order = linkToDelete?.order;

    await prisma.link.delete({
        where: {id: id}
    });
    const links = await prisma.link.findMany({
        where: {userId: userId}
    });

    const superiorLinks = links.filter((link:any) => link.order > order);
    const updatedOrderLinks = superiorLinks.map((link:any) => {
        link.order = link.order - 1;
        return link;
    });

    await fetch('http://localhost:3000/api/link/', {
        method: 'PUT',
        body: JSON.stringify({
            linksToEdit: updatedOrderLinks
        })
    });

    return NextResponse.json(links);
}

export async function PUT(req: Request, res: Response) {
    const {linksToEdit} = await req.json();
    linksToEdit.forEach(async (link:Link, i:number) => {
        await prisma.link.update({
            where: {id: link.id},
            data: {
                order: link.order,
            }
        });
    })

    return NextResponse.json({message: 'Okay'});
}