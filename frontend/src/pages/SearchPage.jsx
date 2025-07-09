// response.data.placesで受け取っているのでAPIが壊れるとここの構造も変わる可能性あり
// activeBookstore or activeCafeが同時に存在する場合の対処（いまのところ前者が優先される）
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PlacesMap } from '../components/PlacesMap'
import { BookstoreSelector } from '../components/BookstoreSelector'
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

    useEffect(()=>{
        const initializeActiveBookstore = () => {
            if(bookstores.length > 0 && !activeBookstore){
                setActiveBookstore(bookstores[0])
            }
        };

        initializeActiveBookstore();
    },[bookstores, activeCafe]);

    useEffect(() =>{
        const fetchBookstores = async () => {
            if(lat && lng && type === 'book_store'){
                try{const response = await axios.get('/api/v1/places', {
                    params: {  
                    lat,
                    lng,
                    type,
                    // keyword: 'book'
                    }
                });
                setBookstores(response.data.places)
            } catch (err){
                console.error('本屋を取得できませんでした。', err)
            }
            }}  
                fetchBookstores();
            },[lat, lng, type]);
//3. HomePageにて位置情報が正しく取得できているかつ、type ='cafe'の場合、カフェを取得する。
// ただ、今はactiveBookstoreで表示をコントロールしているため、カフェの直接検索はできなくなっている。

    useEffect(() =>{
        const fetchCafes = async () => {
            if(lat && lng && type === 'cafe'){
                try{const response = await axios.get('/api/v1/places', {
                    params: {  
                    lat,
                    lng,
                    type,
                    // TODO: keywordを反映させるにはRails側の処理が必要
                    keyword: 'coffee'
                    }
                });
                setCafes(response.data.places)
            } catch (err){
                console.error('カフェを取得できませんでした。', err)
            }
            }}  
                fetchCafes();
            },[lat, lng, type]);

    useEffect(() => {
        const fetchCafesNearBookstore = async () =>{
            if(activeBookstore){
                try { const response = await axios.get('/api/v1/places', {
                    params: {
                    lat: activeBookstore.lat,
                    lng: activeBookstore.lng,                   
                    type: 'cafe',
                    keyword: 'coffee'
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
                <div className="w-full px-4 py-2 bg-gray-100 text-sm text-right">
                <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
                    トップに戻る
                </button>
            </div>
                <PlacesMap
                lat={lat}
                lng={lng}
                bookstores={bookstores}
                cafes={cafes}
                activeBookstore={activeBookstore}
                activeCafe={activeCafe}/>
            </div>
            {/* 検索結果カード */}
            <div className = "w-1/2 h-full ">
            {/* ここはカードではなく、スライドできるナビゲーションバーにする予定 */}
                <BookstoreSelector 
                bookstores={bookstores}
                onSelectBookstore={setActiveBookstore}
                activeBookstore={activeBookstore}/>
            
            {activeBookstore ? 
            <div className="w-full h-full overflow-y-auto">
                <div className="text-sm text-gray-600 px-4 py-2">
                    現在の書店: <span className="font-semibold">{activeBookstore.name}</span>
                </div>
                <CafeCard
                cafes={cafes}
                onSelectCafe={setActiveCafe}/>
            </div>
            :
            <div className="w-full h-full flex items-center justify-center text-gray-500">
                読み込み中
            </div>
             } 
            </div>     
        </div>
        </>
    )
}