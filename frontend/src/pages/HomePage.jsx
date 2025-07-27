import { useState } from "react";
import { SearchModal } from "../components/search/SearchModal";


// 現在地から探すボタンの下に本屋、ペア、カフェを置く
export function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonName, setButtonName] = useState("Open modal");

    const handleButton = () =>{
        if(isOpen === false){
        setButtonName("Close modal")
        setIsOpen(true)
        } else if(isOpen === true){
            setButtonName("Open modal")
            setIsOpen(false)
        }

    }

    return(
     <>
     <button className=""
     onClick={()=> handleButton()}>{buttonName}</button>

     {isOpen && (
        <div className="flex items-center justify-center bg-black opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <SearchModal/>
            </div>
        </div>)}
     
     </>
    )
}