import { Link, LinkListProps } from "@/app/(app)/page";
import LinkCard from "./LinkCard";

export default function LinkList({links}:LinkListProps) {
    return (
        <section>
            <div className="flex flex-col">
                {
                    links.map((link:Link, i:number) => (
                        <LinkCard key={i} link={link} index={i} />
                    ))
                }
            </div>
        </section>
    )
}