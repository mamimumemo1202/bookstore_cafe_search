import { useEffect, useState } from "react";
import { fetchLikes } from "../apis/places";
import { LikeList } from "../components/mylist/LikesList";
import { BackButton } from "../components/common/BackButton"
import { FooterNavigation } from "../components/layout/FooterNavigation"

export function MyList(){
    const [likedPlaces, setLikedPlaces] = useState(null);

    useEffect(() =>{ 
        const fetchLikedPlaces = async () => {
            try {
                const res =  await fetchLikes()
                console.log(res)
                setLikedPlaces(res)
            } catch (error) {
                console.error(error)
            }

        }
        fetchLikedPlaces()
    },[])


    
    
    return(
        <>
        <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
        <BackButton/>
        </div>

        <LikeList likedPlaces={likedPlaces}/>
        <FooterNavigation/>
        </>
    )
}