import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import AddLink from "@/components/AddLink";
import LinksSection from "@/components/LinksSection";

export type Link = {
  id?: number;
  url: string;
  name: string;
  userId: number;
  order: number;
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
  userLinks: Link[];
};

export default async function Home() {
  const session = await getServerSession();

  const userWithLinks: any = await prisma.user.findUnique({
    where: {
      //@ts-ignore
      email: session?.user?.email,
    },
  });
  async function getUserLinks() {
    const response = await fetch(`http://localhost:3000/api/links/${userWithLinks.id}`, {
      method: "GET",
      cache: "no-store",
      next: {
        revalidate: 0,
      }
    });
    return await response.json();
  }

  const links = await getUserLinks();

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-between py-[8rem]">
      <div className="bg-primary/30 absolute right-0 top-[50%] z-[-1] h-[200px] w-[200px] rounded-full blur-[100px]"></div>
      <div className="container">
        <AddLink user={userWithLinks} />
        <LinksSection userLinks={links} />
      </div>
    </main>
  );
}
