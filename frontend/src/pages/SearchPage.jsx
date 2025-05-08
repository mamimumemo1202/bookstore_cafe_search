// 検索バー、検索結果を含む
// 画面構成は
// 左にマップ　右にカードで検索結果を表示
import { useState } from 'react';
import { PlacesMap } from '../components/PlacesMap'
import { PlaceCard } from '../components/PlaceCard'

export function SearchPage() {
    const [places, setPlaces] = useState([]);

    return (
        <>
        <div className = "flex h-screen ">
            {/* 検索結果マップ */}
            <div className = "w-1/2 h-full">
                <PlacesMap
                onPlacesFetched={setPlaces} />
            </div>
            {/* 検索結果カード */}
            <div className = "w-1/2 h-full">
                <PlaceCard 
                places={places} />
            </div>
        </div>
        </>
    )
}