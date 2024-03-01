"use client";

import { useContext, useEffect, useState } from "react";
import LinkContext from "@/lib/LinksContext";
import LinkList from "@/components/LinkList";
import { LinkProvider } from "@/lib/LinksContext";
import Image from "next/image";
import { Link } from "@/app/(app)/page";

type Props = {
  userLinks: Link[];
};

export default function LinksSection({ userLinks }: Props) {
  const { setLinks, links, isEmpty, setIsEmpty } = useContext(LinkContext);

  useEffect(() => {
    if(!links && userLinks) {
      setLinks(userLinks);
    }
    if(!userLinks) {
      setIsEmpty(true);
    }
  }, []);

  return (
    <>
      {isEmpty? (
        <div className="flex flex-col items-center gap-y-3 bg-slate-50 px-3 py-5">
          <Image
            src="/images/empty-links.svg"
            alt="empty"
            width={125}
            height={77}
          />
          <h2 className="text-2xl font-semibold">Let&apos;s get you started</h2>
          <p className="text-md text-center text-slate-500">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We&apos;re here to
            help you share your profiles with everyone!
          </p>
        </div>
      ) : (
        <LinkList />
      )}
    </>
  );
}
