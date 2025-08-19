import { createContext, useCallback, useState, useContext } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const openModal = useCallback(() => setIsOpenModal(true), []);
   const closeModal = useCallback(() => setIsOpenModal(false), []);

  return (
    <ModalContext.Provider value={{isOpenModal, openModal, closeModal}}>
        {children}
    </ModalContext.Provider>);
}

export const useModal = () => useContext(ModalContext);
