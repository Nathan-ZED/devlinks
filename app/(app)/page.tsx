import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import LinkList from "@/components/LinkList";

const prisma = new PrismaClient();

export type Link = {
    id: number,
    url: string,
    name: string,
    userId: number
}

type User = {
    id: number,
    email: string,
    password: string,
    name: string,
    thumbnail: string | null,
    links: Link[]
}

export type LinkListProps = {
    links: Link[]
}

export default async function Home() {
    const session = await getServerSession();

    const userWithLinks: any = await prisma.user.findUnique({
        where: {
        //@ts-ignore
          email: session?.user?.email
        },
        include: {
          links: true
        },
      });

      const linksCount: number = userWithLinks?.links.length;

    return (
        <main className="flex min-h-[100svh] flex-col items-center py-[8rem] justify-between relative">
          <div className="container">
            <div className="flex flex-col items-start gap-y-2 mb-4">
                <h1 className="font-semibold text-2xl">Customize your links</h1>
                <p className="text-md text-slate-500">Add/edit/remove links below and then share all your profiles with the world!</p>
                <div className="flex items-center w-full pt-4">
                    <Button variant='outline' className="w-full py-4 border-primary text-primary active:bg-primary/10 font-medium">
                        <FaPlus className="mr-2 h-4 w-4" /> Add new link
                    </Button>
                </div>
            </div>
            {
                linksCount > 1
                ? (
                    <div className="flex flex-col items-center gap-y-3 bg-slate-50 py-5 px-3">
                        <Image src='/images/empty-links.svg' alt="empty" width={125} height={77}/>
                        <h2 className="font-semibold text-2xl">Let&apos;s get you started</h2>
                        <p className="text-md text-center text-slate-500">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!</p>
                    </div>
                ) 
                : <LinkList links={userWithLinks?.links} />
            }
          </div>
            <div className="fixed bg-white w-full bottom-0 left-0 border-t-2 border-slate-200 py-3">
                <div className="container">
                    <div className="flex items-center justify-end">
                        <Button disabled={true} className="w-full md:w-auto py-4">
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
