"use client";

import { Link, LinkListProps } from "@/app/(app)/page";
import LinkCard from "./LinkCard";
import LinkContext from "@/lib/LinksContext";
import { Suspense, useContext, useEffect } from "react";
import Loading from "./Loading";

export default function LinkList({linksOfUser}:LinkListProps) {

    const {links, setLinks} = useContext(LinkContext);
    
    useEffect(() => {
        setLinks(linksOfUser);
    }, [])

    return (
        <section>
            {
                !links
                 ? <Loading />
                 : (
                    <div className="flex flex-col gap-y-[2rem]">
                        {
                            links?.map((link:Link, i:number) => (
                                <LinkCard key={i} link={link} index={i} />
                            ))
                        }
                    </div>
                 )
            }
        </section>
    )
}