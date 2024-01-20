"use client";
import { Link } from '@/app/(app)/page';
import { createContext, useState } from 'react';


// Définition du type pour les données du contexte
type LinkContextType = {
    links: Link[] | null | [];
    setLinks: (links: Link[]) => void;
    hasChanged: boolean,
    setHasChanged: (hasChanged:boolean) => void;
  };
  
  type LinkProviderProps = {
    children: React.ReactNode;
  };
  
  const LinkContext = createContext<LinkContextType>({
    links: null,
    setLinks: () => {},
    hasChanged: false,
    setHasChanged: () => {}, 
  });
  
  export default LinkContext;

  export const LinkProvider: React.FC<LinkProviderProps> = ({ children }) => {
    const [links, setLinks] = useState<Link[] | null>(null);
    const [hasChanged, setHasChanged] = useState<boolean>(false);
  
    return (
      <LinkContext.Provider value={{ links, setLinks, hasChanged, setHasChanged }}>
        {children}
      </LinkContext.Provider>
    );
  };