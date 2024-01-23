"use client";

import { Link, LinkListProps } from "@/app/(app)/page";
import LinkCard from "./LinkCard";
import LinkContext from "@/lib/LinksContext";
import { Suspense, useContext, useEffect } from "react";
import Loading from "./Loading";
import { AnimatePresence } from "framer-motion";

export default function LinkList({linksOfUser}:LinkListProps) {

    const {links, setLinks, setInitialsLinks, initialLinks, isDisabled, setIsDisabled} = useContext(LinkContext);
    
    useEffect(() => {
        setLinks(linksOfUser);
        if(!initialLinks) setInitialsLinks(linksOfUser);
    }, [])

    return (
        <section>
            {
                !links
                 ? <Loading />
                 : (
                    <div className="flex flex-col gap-y-[2rem]">
                        <AnimatePresence>
                        {
                            links?.map((link:Link, i:number) => (
                                    <LinkCard key={i} link={link} index={i} />
                            ))
                        }
                        </AnimatePresence>
                    </div>
                 )
            }
        </section>
    )
}