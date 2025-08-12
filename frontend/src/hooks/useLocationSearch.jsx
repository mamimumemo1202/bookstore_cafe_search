import { useGeolocation } from "./useGeolocation";
import { useNavigate } from "react-router-dom";
import { useModal } from "../components/contexts/ModalContext";

export function useLocationSearch() {

    const{ getLocation } = useGeolocation();
    const navigate = useNavigate();
    const{ close } = useModal()

    const handleSearch = async (searchMode) =>{
        try {
            const pos = await getLocation();
                navigate(`/search?lat=${pos.lat}&lng=${pos.lng}&mode=${searchMode}`)
                close()
        } catch (error) {
            navigate('/', {state: {error: 'missing_location'}})
            close()
            
        }

    }
    return { handleSearch };
}    