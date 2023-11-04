'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  handleSidebarToggle: () => void;
  handleSidebarClose: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

type SidebarProviderProps = {
  children: ReactNode;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isSmallScreen()) {
        setIsSmallOpen(false);
      }
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  const isSmallScreen = () => {
    return window.innerWidth < 1024;
  };

  const handleSidebarToggle = () => {
    isSmallScreen()
      ? setIsSmallOpen((isSmallOpen) => !isSmallOpen)
      : setIsLargeOpen((isLargeOpen) => !isLargeOpen);
  };

  const handleSidebarClose = () => {
    isSmallScreen() ? setIsSmallOpen(false) : setIsLargeOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        handleSidebarToggle,
        handleSidebarClose,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const value = useContext(SidebarContext);

  if (value == null) {
    throw new Error('Cannot use outside of SidebarProvider');
  }

  return value;
};
