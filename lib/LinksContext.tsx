"use client";

import { Link } from '@/app/(app)/page';
import { createContext, use, useEffect, useState } from 'react';

type LinkContextType = {
    links: Link[] | null | [];
    setLinks: (links: Link[]) => void;
    isDisabled: boolean,
    setIsDisabled: (isDisabled:boolean) => void;
    isEmpty: boolean,
    setIsEmpty: (isEmpty:boolean) => void;
    isLoading: boolean,
    setIsLoading: (isLoading:boolean) => void;
  };
  
  type LinkProviderProps = {
    children: React.ReactNode;
  };
  
  const LinkContext = createContext<LinkContextType>({
    links: null,
    setLinks: () => {},
    isDisabled: true,
    setIsDisabled: () => {},
    isEmpty: false,
    setIsEmpty: () => {},
    isLoading: true,
    setIsLoading: () => {},
  });
  
  export default LinkContext;

  export const LinkProvider: React.FC<LinkProviderProps> = ({ children }) => {
    const [links, setLinks] = useState<Link[] | null>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      if(links) {
        setIsEmpty(false);
        if(links.length === 0) setIsEmpty(true)
      }
    }, [links])

    return (
      <LinkContext.Provider value={{ isEmpty, setIsEmpty, isLoading, setIsLoading, links, setLinks, isDisabled, setIsDisabled }}>
        {children}
      </LinkContext.Provider>
    );
  };