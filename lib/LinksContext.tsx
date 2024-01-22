"use client";
import { Link } from '@/app/(app)/page';
import { createContext, use, useEffect, useState } from 'react';


// Définition du type pour les données du contexte
type LinkContextType = {
    links: Link[] | null | [];
    setLinks: (links: Link[]) => void;
    initialLinks: Link[] | null | [],
    setInitialsLinks: (initialLinks: Link[]) => void;
    isDisabled: boolean,
    setIsDisabled: (isDisabled:boolean) => void;
  };
  
  type LinkProviderProps = {
    children: React.ReactNode;
  };
  
  const LinkContext = createContext<LinkContextType>({
    links: null,
    setLinks: () => {},
    initialLinks: null,
    setInitialsLinks: () => {},
    isDisabled: true,
    setIsDisabled: () => {}, 
  });
  
  export default LinkContext;

  function comparerTableauxObjets(tableau1:any, tableau2:any) {
    // Vérifier si les tableaux ont la même longueur
    if (tableau1?.length !== tableau2?.length) {
        return false;
    }

    // Trier les deux tableaux pour assurer une comparaison cohérente
    tableau1?.sort();
    tableau2?.sort();

    // Comparer les objets à l'intérieur des tableaux
    for (let i = 0; i < tableau1?.length; i++) {
        if (JSON.stringify(tableau1[i]) !== JSON.stringify(tableau2[i])) {
            return false;
        }
    }

    return true;
}
  export const LinkProvider: React.FC<LinkProviderProps> = ({ children }) => {
    const [links, setLinks] = useState<Link[] | null>(null);
    const [initialLinks, setInitialsLinks] = useState<Link[] | null>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    useEffect(() => {
      setIsDisabled(comparerTableauxObjets(links, initialLinks))
    }, [links])
  
    return (
      <LinkContext.Provider value={{ links, setLinks, initialLinks, setInitialsLinks, isDisabled, setIsDisabled }}>
        {children}
      </LinkContext.Provider>
    );
  };