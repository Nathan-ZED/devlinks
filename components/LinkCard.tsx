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


type LinkCard = {
  link: Link;
  index: number,
};

export default function LinkCard({ link, index }: LinkCard) {
  return (
    <div className="bg-slate-200 p-3 rounded-xl flex flex-col gap-y-4 items-center w-full">
      <div className="flex items-center justify-between w-full">
        <span className="font-medium">Link #{index + 1}</span>
        <button type="button" role="button">
          Remove
        </button>
      </div>
      <div className="flex flex-col gap-y-[1rem] items-center w-full">
        <Label className="w-full flex flex-col gap-y-3">
            <span className="text-slate-500">Platform</span>
            <Select value={link.name}>
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
            <Input placeholder="Your Link" />
        </Label>
      </div>
    </div>
  );
}
