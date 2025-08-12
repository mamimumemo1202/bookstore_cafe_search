import { useEffect, useState } from "react";
import { SearchModal } from "../components/search/SearchModal";
import { Header } from "../components/layout/Header"
import { useLocation } from "react-router-dom";
import { useModal } from "../components/contexts/ModalContext";


export function HomePage() {
    const location = useLocation();
    const { isOpen, close } = useModal();

    return(
     <>
     <Header
     variant="home"/>
     
     <h1 className="mt-17">これは本屋とカフェを同時に検索できるアプリです</h1>

     {isOpen && (
        <div className="">
            <SearchModal onClose={close}  />
        </div>)}
     
     </>
    )
}