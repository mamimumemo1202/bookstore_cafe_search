import { useEffect, useState } from "react";
import { SearchModal } from "../components/search/SearchModal";
import { Header } from "../components/layout/Header"
import { useLocation } from "react-router-dom";


export function HomePage() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const location = useLocation();
    
    const handleButton = () =>{
        setIsSearchModalOpen(prev => !prev)
    }

    useEffect(()=>{
        setIsSearchModalOpen(false)
    },[location])

    return(
     <>
     <Header
     setIsSearchModalOpen={setIsSearchModalOpen}/>
     
     <h1 className="mt-17">これは本屋とカフェを同時に検索できるアプリです</h1>
     {isSearchModalOpen && (
        <div className="">
            <SearchModal onClose={handleButton} />
        </div>)}
     
     </>
    )
}