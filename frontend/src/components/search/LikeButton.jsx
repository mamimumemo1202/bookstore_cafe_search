// TODO: 解除1->いいね->解除2をすると解除1のlike_idを送ってエラーがでる

import { HeartIcon } from "@heroicons/react/24/solid"
import { likePlace, unlikePlace } from "../../apis/places"
import { useEffect, useState } from "react"


export function LikeButton({ placeId, type, likeId }){
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        setLiked(!!likeId)
    },[likeId])



    const handleLike = async() => {
        const prev = liked;
        setLiked(!liked);

        try {
            prev ? 
            await unlikePlace(likeId) : await likePlace(placeId, type)

        } catch (error) {
            console.error(error)
            setLiked(prev)
        }
    }

    return(
        <>
        <HeartIcon 
        className={`w-6 h-6 ${liked ? "text-accent-500" : "text-accent-100"}`}
        onClick={() => handleLike()}/>
        </>
    )
}