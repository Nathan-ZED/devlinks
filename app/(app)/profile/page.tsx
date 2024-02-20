import ProfilePicture from "@/components/ProfilePicture";
import SaveButton from "@/components/SaveButton";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";


export default async function Profile() {
  const session = await getServerSession();

  const user = await prisma.user.findUnique({
    //@ts-ignore
    where: {email: session?.user?.email},
  })

  console.log(session);


  return (
    <main className="flex min-h-[100svh] flex-col items-center py-[8rem] justify-between relative">
      <div className="container">
        <div className="flex flex-col items-start gap-y-2 mb-5">
            <h1 className="font-semibold text-2xl">Profile Details</h1>
            <p className="text-md text-slate-500">
            Add your details to create a personal touch to your profile.
            </p>
        </div>
        <ProfilePicture id={user.id} />
      </div>
      <SaveButton />
    </main>
  );
}
