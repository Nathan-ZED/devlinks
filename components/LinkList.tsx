"use client";

import { Link, LinkListProps } from "@/app/(app)/page";
import LinkCard from "./LinkCard";
import LinkContext from "@/lib/LinksContext";
import { Suspense, useContext, useEffect } from "react";
import Loading from "./Loading";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

function sortLinksByOrder(links: Link[]): Link[] {
  return links.slice().sort((a: Link, b: Link) => a?.order - b?.order);
}

function updateOrderWithIndex(links: Link[]): Link[] {
  return links.map((link, index) => ({
    ...link,
    order: index + 1, // On commence l'indexation à 1
  }));
}

//TODO: Faire en sorte que l'on puisse cliquer sur les boutons des links (supprimer, modifier)
//TODO; Supprimer les providers, laisser libre du nom de la plateforme
//TODO: Gérer le bouton "save" pour sauvegarder l'ordre des liens
//TODO: Intégrer la page profile
//TODO: Gérer l'edit des données sur la page profile
//TODO: Intégrer la page preview
//TODO: Revoir les animations
//TODO: Gérer l'upload d'images

export default function LinkList({ linksOfUser }: LinkListProps) {
  const {
    links,
    setLinks,
    setInitialsLinks,
    initialLinks,
  } = useContext(LinkContext);

  useEffect(() => {
    setLinks(sortLinksByOrder(linksOfUser));
    if (!initialLinks) setInitialsLinks(linksOfUser);
  }, []);

  return (
    <section>
      {!links ? (
        <Loading />
      ) : (
        <Reorder.Group axis="y" values={links} onReorder={setLinks} className="flex flex-col gap-y-[1rem]">
          <AnimatePresence>
            {links?.map((link: Link, i: number) => (
                <LinkCard key={link.id} link={link} />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}
    </section>
  );
}
