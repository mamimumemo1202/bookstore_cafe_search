import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PlacesMap } from '../components/PlacesMap'
import { BookstoreSelector } from '../components/BookstoreSelector'
import { useNavigate } from "react-router-dom";
import { CafeCard } from '../components/CafeCard';
import { fetchBookstores, fetchCafes, fetchCafesNearBookstore, fetchPairs } from '../apis/places'
import { BookstoreCard } from '../components/BookstorCard';




export function SearchResultsPage() {
    const [bookstores, setBookstores] = useState([]);
    const [cafes, setCafes] = useState([]);
    const [activeBookstore, setActiveBookstore] = useState(null);
    const [activeCafe, setActiveCafe] = useState(null);
    const [isOpenCafeCard, setIsOpenCafeCard] = useState(false);
    

    // HomePageからStateを自動で引き継ぐ（URLで受け取らない代わり）
    // BUG: 本屋を検索ー＞トップに戻るー＞再度本屋を検索するとマップがLoadingのままの修正
    const location = useLocation();
    const { lat, lng, searchMode = 'bookstore' } = location.state || {};
    console.log('location.state:', location.state);
    const navigate = useNavigate();


    useEffect(()=>{
        if(!lat || !lng) return;

        const fetchPlaces = async() => {
            try{
                if(searchMode === 'bookstore'){
                    const res = await fetchBookstores(lat, lng)
                    setBookstores(res)
                } else if(searchMode === 'cafe'){
                    const res = await fetchCafes(lat, lng)
                    setCafes(res)
                } else if(searchMode === 'pair'){
                    // TODO: pairの処理
                } 
            } catch(err) {
                console.error( 'SearchResultsPageでのエラー', err)
            }}
                fetchPlaces()
            },[lat, lng, searchMode])

    useEffect(()=>{
        if(searchMode === 'bookstore' && activeBookstore){
            const fetchPlaces = async()=>{
                 const res = await fetchCafesNearBookstore(activeBookstore.lat, activeBookstore.lng)
                 setCafes(res)
            }
            fetchPlaces()
        }
    },[activeBookstore, searchMode])



// 1. 現在地が取得できない場合、'/'にリダイレクト
    useEffect(() => {
        if(!lat || !lng|| !searchMode) {
        navigate('/',{
            replace: true,
            state: 'missing_location'
        });
        }
    }, [lat, lng, searchMode]

    );

    useEffect(()=>{
        const initializeActiveBookstore = () => {
            if(bookstores.length > 0 && !activeBookstore){
                setActiveBookstore(bookstores[0])
            }
        };

        initializeActiveBookstore();
    },[bookstores]);

    // useEffectは描画完成した後に副作用として発砲する。つまり、これが先に発砲されnullで描画終了後useEffectが作動し'/'に遷移
    if(!lat || !lng || !searchMode) {
        return null;
        };


    return (
        <>
        <div className = "flex flex-col sm:flex-row h-screen ">
            

            <div className = "h-2/5 w-full  sm:w-1/2 sm:h-full">
                <div className="w-full px-4 py-2 bg-gray-100 text-sm text-right">
                <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
                    トップに戻る
                </button>
                </div>
                {/* 検索結果マップ */}
                <PlacesMap
                lat={lat}
                lng={lng}
                bookstores={bookstores}
                cafes={cafes}
                activeBookstore={activeBookstore}
                activeCafe={activeCafe}/>
            </div>

        <div className="h-3/5 w-full  sm:w-1/2 sm:h-full overflow-y-auto">
            <div className='sticky top-0 p-2 bg-white'>
            {searchMode === 'bookstore' && (
                <button
                type='button'
                className= " justify-end text-sm text-blue-600 hover:underline"
                onClick={()=>setIsOpenCafeCard(prev => !prev)}>
                    { isOpenCafeCard? "本屋を選びなおす" : "カフェも選ぶ" }
                </button>)}
            </div>

            {searchMode === 'bookstore' && !isOpenCafeCard? (
                <div className=''> 
                    {/* 本屋カード */}
                    <BookstoreCard
                    bookstores={bookstores}
                    onSelectBookstore={setActiveBookstore}
                    activeBookstore={activeBookstore}
                    setIsOpenCafeCard={setIsOpenCafeCard}
                    lat={lat}
                    lng={lng}
                    />
                </div>
                ) : (
                
                <div className = "">
                    {/* 書店セレクター */}            
                    {searchMode === 'bookstore' && (            
                        <BookstoreSelector 
                        bookstores={bookstores}
                        onSelectBookstore={setActiveBookstore}
                        activeBookstore={activeBookstore}/>
                        )}
                    
                    {/* カフェカード */}
                    {cafes.length > 0 ? 
                    <div className="w-full h-full overflow-y-auto">
                        <CafeCard
                        cafes={cafes}
                        onSelectCafe={setActiveCafe}/>
                    </div>
                    :
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        読み込み中
                    </div>
                    } 
                </div>)}
        </div>
        </div>
        </>
    )
}