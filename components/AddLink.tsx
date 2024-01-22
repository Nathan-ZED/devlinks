'use client';

import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { useContext } from "react";
import LinkContext from "@/lib/LinksContext";
import { getServerSession } from "next-auth";
import { Link } from "@/app/(app)/page";

type User = {
    id: number;
    email: string;
    password?: string;
    thumbnail: string | null,
    links: Link[];
}

type AddLinkProps = {
    user: User
}

function highestID(objets: Link[] | [] | null): number {
  let maxId = 0;
  if(objets) {

    objets.forEach((objet:Link) => {
      if(objet.id) {
        if (objet.id > maxId) {
            maxId = objet.id;
        }
      }
    });
  }
  return maxId + 1;
}

export default function AddLink({user}:AddLinkProps) {
    const { links, setLinks, setIsDisabled } = useContext(LinkContext);
    
    function handleClick() {
        const newLink:Link = {
          id: highestID(links),
          name: '',
          url: '',
          userId: user?.id,
        }
        const updatedLinks = links ? [...links, newLink] : [newLink]
        setLinks(updatedLinks);
    }

  return (
    <div className="flex flex-col items-start gap-y-2 mb-5">
      <h1 className="font-semibold text-2xl">Customize your links</h1>
      <p className="text-md text-slate-500">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <div className="flex items-center w-full pt-4">
        <Button
          onClick={() => handleClick()}
          variant="outline"
          className="add-button w-full py-4 border-primary text-primary active:bg-primary/10 font-medium"
        >
          <FaPlus className="mr-2 h-4 w-4" /> Add new link
        </Button>
      </div>
    </div>
  );
}
