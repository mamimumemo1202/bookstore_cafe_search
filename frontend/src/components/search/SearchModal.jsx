
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./SearchByKeyword";
import { SearchFromCurrentLocationbutton } from './SearchFromCurrentLocationButton';

export function SearchModal() {
    const location = useLocation()
    const error = location.state?.error

    useEffect(()=>{
        if(error === 'missing_location'){
            alert('位置情報を所得できませんでした')
        }
    },[error])

    return(
     <div className="">
     <div className="flex items-center justify-center h-screen">
        <SearchFromCurrentLocationbutton/>
        <SearchBar/>
     </div>
     </div>
    )
}