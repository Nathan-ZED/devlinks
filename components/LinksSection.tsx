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

export const LoadingSpinner = () => {
  return (
    <div className="flex w-full items-center justify-center gap-x-3">
      <span>Your links are loading</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={"animate-spin"}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};

export default function LinksSection({ userLinks }: Props) {
  const { links } = useContext(LinkContext);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (links) setIsLoading((prev) => !prev);
    links?.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
  }, [links]);

  return (
    <>
      {isEmpty && !isLoading ? (
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
        <LinkList linksOfUser={userLinks} />
      )}
    </>
  );
}
