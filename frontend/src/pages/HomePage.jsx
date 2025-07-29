import { useState } from "react";
import { SearchModal } from "../components/search/SearchModal";
import { Header } from "../components/Header"


export function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const handleButton = () =>{
        setIsOpen(prev => !prev)
    }

    return(
     <>
     <Header
     setIsOpen={setIsOpen}/>
     
     {isOpen && (
        <div className="">
            <SearchModal onClose={handleButton} />
        </div>)}
     
     </>
    )
}