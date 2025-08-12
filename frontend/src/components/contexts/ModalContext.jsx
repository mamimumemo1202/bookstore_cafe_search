import { createContext, useCallback, useState, useContext } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
   const [isOpen, setOpen] = useState(false);
   const open = useCallback(() => setOpen(true), []);
   const close = useCallback(() => setOpen(false), []);

  return (
    <ModalContext.Provider value={{isOpen, open, close}}>
        {children}
    </ModalContext.Provider>);
}

export const useModal = () => useContext(ModalContext);
