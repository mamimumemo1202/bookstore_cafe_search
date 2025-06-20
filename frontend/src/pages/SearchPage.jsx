// 検索バー、検索結果を含む
// 画面構成は
// 左にマップ　右にカードで検索結果を表示
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PlacesMap } from '../components/PlacesMap'
import { PlaceCard } from '../components/PlaceCard'
import { useNavigate } from "react-router-dom";


export function SearchPage() {
    const [places, setPlaces] = useState([]);
    // HomePageぁらStateを自動で引き継ぐ（URLで受け取らない代わり）
    const location = useLocation();
    const { lat, lng, type } = location.state || {};
    const navigate = useNavigate();


    useEffect(() => {
        if(!lat || !lng|| !type) {
         alert("このページには直接アクセスできません。トップページに戻ります。");
        navigate('/');
        }
    }, [lat, lng, type, navigate]

    );
    // useEffectは描画完成した後に副作用として発砲する。つまり、これが先に発砲されnullで描画終了後useEffectが作動し'/'に遷移
    if(!lat || !lng|| !type) {
        return null;
        };

    

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