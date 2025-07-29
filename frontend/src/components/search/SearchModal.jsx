
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./SearchByKeyword";
import { SearchPairbutton } from '../search/SearchPairButton';
import { SearchBookstorebutton } from '../search/SearchBookstoreButton';
import { SearchCafebutton } from '../search/SearchCafeButton';
import { SearchModeSelector } from '../search/SearchModeSelector';

import { XMarkIcon } from '@heroicons/react/24/solid'

export function SearchModal({onClose}) {
    const location = useLocation()
    const error = location.state?.error
    const [searchMode, setSearchMode] = useState(null)
    

    useEffect(()=>{
        if(error === 'missing_location'){
            alert('位置情報を所得できませんでした')
        }
    },[error])

    return(
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50">
        <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-2xl h-[70vh] w-11/12">
            <button className="absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-black"
            onClick={onClose}>
                <XMarkIcon className=" w-full h-full"/>
            </button>

            <div className="">
                <h1 className="text-xl mb-4">現在地からさがす</h1>
                    <div className="flex flex-col  sm:flex-row">
                        <SearchPairbutton/>
                        <SearchBookstorebutton/>
                        <SearchCafebutton/>
                    </div> 

                <hr className="my-6 border-t border-gray-300"/> 
                <h1 className="text-xl mb-5">住所・駅名・店舗名からさがす</h1>
                    <div className="flex flex-col">
                        <div className="mb-4">
                        <SearchModeSelector 
                        setSearchMode={setSearchMode}
                        searchMode={searchMode}/>
                        </div>
                        <SearchBar searchMode={searchMode}/>
                    </div>  
            </div>
        </div>
     </div>
    )
}