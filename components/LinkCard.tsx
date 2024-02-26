"use client";

import { Link } from "@/app/(app)/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaEdit } from "react-icons/fa";
import { Platform } from "./utils";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import LinkContext from "@/lib/LinksContext";
import { FaTrash } from "react-icons/fa6";
import { motion, useDragControls } from "framer-motion";
import * as Icons from "react-icons/fa"
import * as IconsSix from "react-icons/fa6"
import { MdDragIndicator } from "react-icons/md";
import { Reorder } from "framer-motion";


type LinkCard = {
  link: Link;
};

export default function LinkCard({ link }: LinkCard) {
  const { links, setLinks, isDisabled, setIsDisabled, platforms } = useContext(LinkContext);
  const [platform, setPlatform] = useState<Platform | null>(null)
  const [selectedLink, setSelectedLink] = useState<string>(link.name);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string | null>(null);
  const controls = useDragControls();

  async function handleRemove(e: SyntheticEvent) {
    const response = await fetch(`/api/link/`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: link.id,
        userId: link.userId,
      }),
    });
    const linksWithoutDeletedOne = await response.json();
    setLinks(linksWithoutDeletedOne);
  }

  function handleChange(newValue: string) {
    setSelectedLink(newValue);
    const newValueElem = platforms?.filter((el) => el.name === newValue);
    if (newValueElem) {
      setLinkUrl(newValueElem[0]?.url);
    };
  }

  useEffect(() => {
    if(link.name === '') {
      setEditMode(true);
    }
    const selectedPlatform = platforms?.filter(el => el.id === link.platformId);
    if(selectedPlatform) setPlatform(selectedPlatform[0]);
  }, [platforms])

  function rightInputPlaceholder() {
    if (linkUrl) return linkUrl;
    if (link.url) return link.url;
    return "Your link...";
  }

  console.log(link);

  return (
    <Reorder.Item dragListener={false} dragControls={controls} value={link}>
        <motion.div 
          initial={{transformOrigin: 'top', scaleY: .5, opacity: 0}} 
          animate={{transformOrigin: 'top', scaleY: 1, opacity: 1}}  
          exit={{transformOrigin: 'top', scaleY: .5, opacity: 0}}
          className="text-white select-none bg-white border-2 border-slate-200 p-4 relative z-10 rounded-xl flex gap-y-2 items-center w-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full z-[0] opacity-20"></div>
          <div className="flex flex-col items-start gap-y-3 w-full">
            <div className="flex items-center justify-between w-full relative z-10">
              <span className="font-light text-4xl flex items-center gap-x-3" style={{color: platform?.color}}>
                <span className="font-bold text-xl text-slate-700">{link.name}</span>
              </span>
            </div>
            <div className="flex gap-x-2 items-center relative z-10 w-full">
              <IconsSix.FaLink className="text-slate-400 text-xl" />
              <span className="text-start text-slate-400">{rightInputPlaceholder()}</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
                <button
                  className="flex items-center gap-x-2 p-3 rounded-lg text-slate-400 relative z-10"
                  type="button"
                  onClick={() => setEditMode(prev => !prev)}
                  role="button">
                  <FaEdit className="text-2xl" />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="flex relative z-10 items-center gap-x-2 text-red-400"
                      type="button"
                      role="button"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[90%] rounded-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will delete {link.name} in your links.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500" onClick={handleRemove}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <button onPointerDown={(e) => controls.start(e)} className="relative z-10 p-3 touch-none" type="button">
                  <MdDragIndicator className="text-4xl text-slate-300 ms-4" />
                </button>
              </div>
        </motion.div>
    </Reorder.Item>
  );
}
