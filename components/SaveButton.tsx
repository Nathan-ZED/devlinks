'use client';

import { Link } from "@/app/(app)/page";
import { Button } from "@/components/ui/button"
import LinkContext from "@/lib/LinksContext";
import { useContext } from "react";

function comparerTableaux(tableauA:Link[] | [] | null, tableauB:Link[] | [] | null) {
  const result:Link[] | [] = [];

  tableauB?.forEach((objB:any) => {
      const objA = tableauA?.find(objA => objA.id === objB.id);
      if (!objA || !objetsEgaux(objA, objB)) {
          result.push(objB);
      }
  });

  return result;
}

function objetsEgaux(obj1:any, obj2:any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
      return false;
  }

  for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
          return false;
      }
  }

  return true;
}



export default function SaveButton() {
    const { isDisabled, setIsDisabled, links, initialLinks} = useContext(LinkContext);

    async function handleSave() {
      const response = await fetch('/api/link', {
        method: 'PUT',
        body: JSON.stringify({
          linksToEdit: comparerTableaux(links, initialLinks),
        })
      });
      const newLinks = await response.json();
      console.log(newLinks);
    }

  return (
    <div className="fixed bg-white w-full bottom-0 left-0 border-t-2 z-20 border-slate-200 py-3">
      <div className="container">
        <div className="flex items-center justify-end">
          <Button onClick={() => handleSave()} disabled={isDisabled} className="w-full transition-all duration-300 md:w-auto py-4">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
