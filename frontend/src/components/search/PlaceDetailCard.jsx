// 写真、店舗名、評価、営業時間、住所、オリジナル情報（ペアの時の距離）
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../../apis/places"

export function PlaceDetailCard({ variant, placeId }) {
    const[place, setPlace] = useState(false)

    const placeDetails = async() => {
        const res = await fetchPlaceDetails(placeId)
        setPlace(res)
    }

    useEffect(()=>{placeDetails()},[placeId])


    return (
      <>
        {variant === "bookstore" && 
            <div className="flex flex-col">
                {place.name}
            </div>
        }

        {variant ==="cafe" && 
            <div></div>
        }
      </>
    )
}