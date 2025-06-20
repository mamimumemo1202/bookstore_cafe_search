// 検索バー、検索結果を含む
// 画面構成は
// 左にマップ　右にカードで検索結果を表示
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PlacesMap } from '../components/PlacesMap'
import { PlaceCard } from '../components/PlaceCard'

export function SearchPage() {
    const [places, setPlaces] = useState([]);
    // HomePageぁらStateを自動で引き継ぐ（URLで受け取らない代わり）
    const location = useLocation();
    const { lat, lng, type } = location.state || {};

    console.log(lat, lng, type)

    return (
        <>
        <div className = "flex h-screen ">
            {/* 検索結果マップ */}
            <div className = "w-1/2 h-full">
                <PlacesMap
                onPlacesFetched={setPlaces}
                lat={lat}
                lng={lng}
                type={type}/>
            </div>
            {/* 検索結果カード */}
            <div className = "w-1/2 h-full  overflow-y-auto">
                <PlaceCard 
                places={places} />
            </div>
            
        </div>
        </>
    )
}