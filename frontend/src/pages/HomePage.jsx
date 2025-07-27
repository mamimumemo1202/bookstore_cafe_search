import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchByKeyword";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchFromCurrentLocationbutton } from '../components/SearchFromCurrentLocationButton'


// 現在地から探すボタンの下に本屋、ペア、カフェを置く
export function HomePage() {
    const navigate = useNavigate();
    const location = useLocation()
    const error = location.state?.error

    useEffect(()=>{
        if(error === 'missing_location'){
            alert('位置情報を所得できませんでした')
        }
    },[error])

    return(
     <>
     <div className="flex items-center justify-center h-screen">
        <SearchFromCurrentLocationbutton/>
        <SearchBar/>
     </div>
     </>
    )
}