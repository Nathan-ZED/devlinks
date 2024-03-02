"use client";
import { useState } from "react";
import { Link } from "@/app/(app)/page";
import LinkCard from "./LinkCard";
import LinkContext from "@/lib/LinksContext";
import { useContext, useEffect } from "react";
import Loading from "./Loading";
import { AnimatePresence, Reorder } from "framer-motion";

export default function LinkList() {
  const { links, setLinks } = useContext(LinkContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if(links) {
      setIsLoading(false);
    }
    return () => {
      setIsLoading((prev:boolean) => !prev);
    };
  }, [links])

  async function onReorder(values: Link[]) {
    const links = values.map((link, index) => {
      link.order = index + 1;
      return link;
    });
    await fetch(`/api/link`, {
      method: 'PUT',
      body: JSON.stringify({
        linksToEdit: links,
      })
    });
    setLinks(links);
  }

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : (
        <Reorder.Group axis="y" values={links} onReorder={onReorder} className="flex flex-col gap-y-[1rem]">
          <AnimatePresence>
            {links?.map((link: Link) => (
                <LinkCard key={link.id} link={link} />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}
    </section>
  );
}
