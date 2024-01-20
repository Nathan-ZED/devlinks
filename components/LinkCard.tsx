"use client";

import { Link } from "@/app/(app)/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub } from "react-icons/fa";
import { platforms, Platform } from "./utils";
import { IconType } from "react-icons/lib";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import LinkContext from "@/lib/LinksContext";
import { FaCopy, FaTrash } from "react-icons/fa6";
import { FaPaste } from "react-icons/fa6";
import { Button } from "./ui/button";


type LinkCard = {
  link: Link;
  index: number,
};

export default function LinkCard({ link, index }: LinkCard) {
    const {links, setLinks} = useContext(LinkContext);
    const [selectedLink, setSelectedLink] = useState<string>(link.name);
    const [linkUrl, setLinkUrl] = useState<string | null>(null);

    function handleRemove(e:SyntheticEvent) {
        const linksWithoutDeletedOne = !link.id ? links?.slice(0, -1) : links?.filter((el) => el.id === link.id);
        if(linksWithoutDeletedOne) setLinks(linksWithoutDeletedOne);
    }

    function handleChange(newValue:string) {
        setSelectedLink(newValue);
        const newValueElem = platforms?.filter((el) => el.name === newValue);
        console.log(newValueElem)
        if(newValueElem) setLinkUrl(newValueElem[0]?.url);
    }

    function rightInputPlaceholder() {
        console.log(linkUrl)
        if(linkUrl) return linkUrl
        if(link.url) return link.url;
        
        return 'Your link...';
    }

  return (
    <div className="bg-primary/10 border-2 border-primary p-4 rounded-xl flex flex-col gap-y-4 items-center w-full">
      <div className="flex items-center justify-between w-full">
        <span className="font-light text-slate-400 text-xl">Link #<span className="text-primary/70 font-bold">{index + 1}</span></span>
        <button onClick={handleRemove} className="flex items-center gap-x-2 text-red-400" type="button" role="button">
          <FaTrash />
          Remove
        </button>
      </div>
      <div className="flex flex-col gap-y-[1rem] items-center w-full">
        <Label className="w-full flex flex-col gap-y-3">
            <span className="text-slate-500">Platform</span>
            <Select onValueChange={(e:string) => handleChange(e)} defaultValue={link.name}>
            <SelectTrigger className="w-full flex items-center justify-between">
                    <SelectValue placeholder="Select your platform" />
            </SelectTrigger>
            <SelectContent>
                {
                    platforms.map((platform: Platform) => {
                        const IconComponent: any = platform.icon;
                        return (
                            <SelectItem key={platform.name} value={platform.name}>
                                <div className="flex items-center gap-x-3 justify-start w-full">
                                    <IconComponent />
                                    <span>{platform.name}</span>
                                </div>
                            </SelectItem>
                        )
                    })
                }
            </SelectContent>
            </Select>
        </Label>
        <Label className="w-full flex flex-col gap-y-3">
            <span className="text-slate-500">Link</span>
                <Input placeholder={rightInputPlaceholder()} />
            <div className="flex items-center gap-x-3">
                <Button className="copy text-primary active:text-white active:bg-primary focus:bg-white bg-white py-4 flex justify-center items-center gap-x-2 rounded-md w-full">
                    <FaCopy />
                    <span>Copy</span>
                </Button>
                <Button className="copy text-primary active:text-white active:bg-primary focus:bg-white bg-white py-4 flex justify-center items-center gap-x-2 rounded-md w-full">
                    <FaPaste />
                    <span>Paste</span>
                </Button>
            </div>
        </Label>
      </div>
    </div>
  );
}
