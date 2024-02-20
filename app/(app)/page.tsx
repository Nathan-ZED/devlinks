import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import AddLink from "@/components/AddLink";
import SaveButton from "@/components/SaveButton";
import LinksSection from "@/components/LinksSection";

export type Link = {
  id?: number;
  url: string;
  name: string;
  userId: number;
  order: number;
  platformId?: number;
};

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  thumbnail: string | null;
  links: Link[];
};

export type LinkListProps = {
  linksOfUser: Link[];
};

export default async function Home() {
  const session = await getServerSession();

  const userWithLinks: any = await prisma.user.findUnique({
    where: {
      //@ts-ignore
      email: session?.user?.email,
    },
    include: {
      links: true,
    },
  });

  const linksCount: number = userWithLinks?.links.length;

  return (
      <main className="flex min-h-[100svh] flex-col items-center py-[8rem] justify-between relative">
        <div className="absolute right-0 z-[-1] bg-primary/30 top-[50%] rounded-full w-[200px] h-[200px] blur-[100px]"></div>
        <div className="container">
          <AddLink user={userWithLinks} />
          <LinksSection userLinks={userWithLinks?.links} /> 
        </div>
        <SaveButton />
      </main>
  );
}
