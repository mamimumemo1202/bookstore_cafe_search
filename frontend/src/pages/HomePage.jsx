import { useState } from "react";
import { SearchModal } from "../components/search/SearchModal";
import { Header } from "../components/layout/Header"


export function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const handleButton = () =>{
        setIsOpen(prev => !prev)
    }

    return(
     <>
     <Header
     setIsOpen={setIsOpen}/>
     
     <h1 className="mt-17">これは本屋とカフェを同時に検索できるアプリです</h1>
     {isOpen && (
        <div className="">
            <SearchModal onClose={handleButton} />
        </div>)}
     
     </>
    )
}