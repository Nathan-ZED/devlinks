"use client";

import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import LinkContext from "@/lib/LinksContext";
import { Link } from "@/app/(app)/page";
import { Platform } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { DynamicFaIcon } from "./LinkCard";

type User = {
  id: number;
  email: string;
  password?: string;
  thumbnail: string | null;
  links: Link[];
};

type AddLinkProps = {
  user: User;
};

function highestID(objets: Link[] | [] | null): number {
  let maxId = 0;
  if (objets) {
    objets.forEach((objet: Link) => {
      if (objet.id) {
        if (objet.id > maxId) {
          maxId = objet.id;
        }
      }
    });
  }
  return maxId + 1;
}

type FormAddData = {
  platform: string,
  link: string,
}

export default function AddLink({ user }: AddLinkProps) {
  const { links, setLinks, setIsDisabled, platforms } = useContext(LinkContext);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  function handleChange(selectVal: string) {
    setSelectValue(selectVal);
  }

  function closeDialog() {
    setIsDialogOpen(prev => !prev)
    setSelectValue(null)
    reset();
    setError(null);
  }

  function handleInput(e:React.SyntheticEvent<HTMLInputElement>) {
    if(e.currentTarget.value.length > 0) {
      if(!isComplete) setIsComplete(prev => !prev)
    } else {
      if(isComplete) setIsComplete(false);
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsComplete(false);
    const {link} = values;
    const response = await fetch('/api/link/', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.id,
        platform: selectValue,
        link: link,
      }),
    })
    const newLinks = await response.json();
    if(!newLinks.status) {
      reset();
      setLinks(newLinks);
      setSelectValue(null)
      setIsDialogOpen(prev => !prev);
    } else {
      setError(newLinks.error);
    }

}

  return (
    <div className="flex flex-col items-start gap-y-2 mb-5">
      <h1 className="font-semibold text-2xl">Customize your links</h1>
      <p className="text-md text-slate-500">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <div className="flex items-center w-full pt-4">
        <Dialog open={isDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(prev => !prev)}
              className="add-button w-full py-4 border-primary text-primary active:bg-primary/10 font-medium"
            >
              <FaPlus className="mr-2 h-4 w-4" /> Add new link
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] rounded-xl gap-y-5 flex flex-col">
            <form className="flex flex-col gap-y-[2rem]" onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add a new link</DialogTitle>
                <DialogDescription>
                  Here you can add a new link to your list
                </DialogDescription>
              </DialogHeader>
              <Label className="w-full flex flex-col gap-y-3">
                <span className="text-slate-500">Platform</span>
                <Select {...register('platform')} onValueChange={handleChange}>
                  <SelectTrigger className="w-full flex items-center justify-between">
                    <SelectValue placeholder="Select your platform" />
                  </SelectTrigger>
                  <SelectContent>
                  {platforms?.map((platform: Platform) => {
                    return (
                      <SelectItem key={platform.name} value={platform.name}>
                        <div className="flex items-center gap-x-3 justify-start w-full">
                          <DynamicFaIcon name={platform.icon} />
                          <span>{platform.name}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                  </SelectContent>
                </Select>
              </Label>
              {
                selectValue && (
                  <Label className="w-full flex flex-col gap-y-3">
                    <span className="text-slate-500">Link</span>
                    <Input {...register('link')} onChange={handleInput} />
                  </Label>
                )
              }
              {
                error &&
                <span className="text-center text-red-600">{error}</span>
              }
              <DialogFooter className="flex flex-col item-center gap-y-4">
                <Button disabled={!isComplete} type="submit">Add a new link</Button>
                <Button variant={'outline'} onClick={() => closeDialog()} type="button">Cancel</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
