import { useEffect, useState } from "react";
import { SearchModal } from "../components/search/SearchModal";
import { Header } from "../components/layout/Header"
import { useLocation } from "react-router-dom";
import { useModal } from "../components/contexts/ModalContext";
import { FooterNavigation } from "../components/layout/FooterNavigation";


export function HomePage() {
    const location = useLocation();
    const { isOpenModal, closeModal } = useModal();

    return(
     <>
     <Header
     variant="home"/>
     
     <h1 className=" h-full mt-17">これは本屋とカフェを同時に検索できるアプリです</h1>

     {isOpenModal && (
        <div className="">
            <SearchModal onClose={closeModal}  />
        </div>)}
        <FooterNavigation/>
     
     </>
    )
}