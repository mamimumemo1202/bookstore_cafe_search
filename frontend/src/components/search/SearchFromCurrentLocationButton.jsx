import {useGeolocation} from '../../hooks/useGeolocation'
import { useNavigate } from "react-router-dom";

export function SearchFromCurrentLocationbutton(){
    const{ getLocation } = useGeolocation();
    const navigate = useNavigate();

    const hendleSearch = async (searchMode) =>{
        try {
            const pos = await getLocation();
                navigate('/SearchResultsPage', {
                    state: {
                        lat: pos.lat,
                        lng: pos.lng,
                        searchMode: searchMode
                    }
                })
        } catch (error) {
            navigate('/', {state: {error: 'missing_location'}})
            
        }

    }

    return(
        <>
        <div className='flex flex-col p-3'>
            <div 
            className="text-gray-700 rounded-md border border-gray-700 px-4 py-2 m-1 text-start cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={ ()=> hendleSearch('pair') }>
                本屋とカフェをまとめてさがす（未実装）
            </div>
            <div 
            className="text-gray-700 rounded-md border border-gray-700 px-4 py-2 m-1 text-start cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={ ()=> hendleSearch('bookstore') }>
                本屋さがす（続けてカフェもさがせます）
            </div>
            <div 
            className="text-gray-700 rounded-md border border-gray-700 px-4 py-2 m-1 text-starts cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={ ()=> hendleSearch('cafe') }>
                カフェをさがす
            </div>
        </div>
        </>
    )
}