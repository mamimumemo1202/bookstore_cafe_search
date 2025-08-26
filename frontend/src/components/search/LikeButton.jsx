import { HeartIcon } from "@heroicons/react/24/solid"
import { likePlace } from "../../apis/places"


export function LikeButton(){
    return(
        <>
        <HeartIcon 
        className="w-6 h-6"
        onClick={() => likePlace("ChIJm8NavNCAGGARrHOVyidjdW4", "Bookstore")}/>
        </>
    )
}