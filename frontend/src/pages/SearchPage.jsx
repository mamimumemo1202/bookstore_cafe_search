// 検索バー、検索結果を含む
// 画面構成は
// 左にマップ　右にカードで検索結果を表示
// response.data.placesで受け取っているのでAPIが壊れるとここの構造も変わる可能性あり
// activeBookstore or activeCafeが同時に存在する場合の対処（いまのところ前者が優先される）
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PlacesMap } from '../components/PlacesMap'
import { BookstoreCard } from '../components/BookstoreCard'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CafeCard } from '../components/CafeCard';



export function SearchPage() {
    const [bookstores, setBookstores] = useState([]);
    const [cafes, setCafes] = useState([]);
    const [activeBookstore, setActiveBookstore] = useState(null);
    const [activeCafe, setActiveCafe] = useState(null);

    // HomePageぁらStateを自動で引き継ぐ（URLで受け取らない代わり）
    const location = useLocation();
    const { lat, lng, type } = location.state || {};
    const navigate = useNavigate();

// 1. 現在地が取得できない場合、'/'にリダイレクト
    useEffect(() => {
        if(!lat || !lng|| !type) {
         alert("このページには直接アクセスできません。トップページに戻ります。");
        navigate('/');
        }
    }, [lat, lng, type, navigate]

    );

// 2. HomePageにて位置情報が正しく取得できているかつ、type ='bookstore'の場合、本屋を取得する。
    useEffect(() =>{
        const fetchBookstores = async () => {
            if(lat && lng && type === 'bookstore'){
                try{const response = await axios.get('/api/v1/places', {
                    params: {  
                    lat,
                    lng,
                    keyword: type
                    }
                });
                setBookstores(response.data.places)
            } catch (err){
                console.error('本屋を所得できませんでした。', err)
            }
            }}  
                fetchBookstores();
            },[lat, lng, type]);
    

// 3. 本屋が選択されたとき近くのカフェを表示する
    useEffect(() => {
        const fetchCafesNearBookstore = async () =>{
            if(activeBookstore){
                try { const response = await axios.get('/api/v1/places', {
                    params: {
                    lat: activeBookstore.lat,
                    lng: activeBookstore.lng,
                    keyword: 'cafe'
                    }});
                    setCafes(response.data.places);
                } catch (err){
                    console.error('カフェを所得できませんでした。', err)

                }}};fetchCafesNearBookstore();
                
                }, [activeBookstore]);

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
                lat={lat}
                lng={lng}
                type={type}
                bookstores={bookstores}
                cafes={cafes}
                activeBookstore={activeBookstore}
                activeCafe={activeCafe}/>
            </div>
            {/* 検索結果カード */}
            <div className = "w-1/2 h-full overflow-y-auto">
                <BookstoreCard 
                bookstores={bookstores}
                onSelectBookstore={setActiveBookstore}/>
            </div>
            {activeBookstore ? <div className="w-1/2 h-full overflow-y-auto">
                <CafeCard
                cafes={cafes}
                onSelectCafe={setActiveCafe}/>
            </div>
            :
            <div className="w-1/2 h-full flex items-center justify-center text-gray-500">
                書店を選択してカフェを表示してください。
            </div>
             }      
        </div>
        </>
    )
}