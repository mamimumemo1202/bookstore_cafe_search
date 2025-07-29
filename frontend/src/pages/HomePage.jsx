import { useState } from "react";
import { SearchModal } from "../components/search/SearchModal";


export function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const handleButton = () =>{
        setIsOpen(prev => !prev)
    }

    return(
     <>
     <div className=""
     onClick={()=>setIsOpen(true)}>検索する</div>

     {isOpen && (
        <div className="">
            <SearchModal onClose={handleButton} />
        </div>)}
     
     </>
    )
}