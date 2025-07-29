import { useGeolocation } from "./useGeolocation";
import { useNavigate } from "react-router-dom";

export function useLocationSearch() {

    const{ getLocation } = useGeolocation();
    const navigate = useNavigate();

    const handleSearch = async (searchMode) =>{
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
    return { handleSearch };
}    