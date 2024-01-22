'use client';

import { Button } from "@/components/ui/button"
import LinkContext from "@/lib/LinksContext";
import { useContext } from "react";


export default function SaveButton() {
    
    const { isDisabled, setIsDisabled} = useContext(LinkContext);

  return (
    <div className="fixed bg-white w-full bottom-0 left-0 border-t-2 border-slate-200 py-3">
      <div className="container">
        <div className="flex items-center justify-end">
          <Button disabled={isDisabled} className="w-full transition-all duration-300 md:w-auto py-4">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
