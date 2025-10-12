import { useState } from 'react';
import { OpenMapAppButton } from '../search/OpenMapAppButton'
import { LikeButton } from './LikeButton';
import { LikePairButton } from './LikePairButton';
import { getPlacePhotoUrl } from '../../lib/placePhoto';
import { PlaceDetailCard } from './PlaceDetailCard';


export function CafeCard ({ 
    cafes,
    onSelectCafe,
    activeBookstore,
    onClick,
    activecafe
   }){

    const [openIds, setOpenIds] = useState({});

    const detailedToggle = (id) =>{
    setOpenIds(prev => ({
        ...prev,
        [id]:!prev[id]
    }))
  };

  const handleCafeSelect = (cafe) => {
    detailedToggle(cafe.place_id)
    onSelectCafe(cafe)
    onClick(cafe)
  };

    return (
        <>
        {/* TODO: クリック時のカードのスタイルおよびカード自体のデザインの改変 */}
        <div className="grid grid-cols-1">
          {cafes.map(cafe => (  
            <div key={cafe.place_id} 
              className={` rounded-r-xl shadow-sm ml-1 mb-1 ${activecafe?.place_id === cafe.place_id? "border-l-5 border-primary-500 bg-primary-800 text-primary-50" : "text-primary-800 bg-primary-50 border-l-5 border-primary-300 "} `}
              onClick = {() => handleCafeSelect(cafe)}>
              
              {/* 左サムネ + 右テキスト */}          
          <div className="flex items-start gap-3">
            {/* サムネ（正方形） */}
            <div className="shrink-0 overflow-hidden rounded-r-md ">
            <img
            src={getPlacePhotoUrl(cafe.photo_ref)}
            alt="No image"
            loading="eager"
            className="w-17 h-17 object-cover"
            />
            </div>
            {/* 本文といいね */}
            <div className="flex items-center justify-between gap-3 p-1">
            <h2 className="text-lg font-semibold cursor-pointer "
            >
                {cafe.name}
            </h2>
         <button onClick={(e) => e.stopPropagation()}>
          <LikeButton
              placeId={cafe.place_id}
              type="cafe"
              likeId={cafe.like_id}
          />
          </button>

          {activeBookstore && 
              <button onClick={(e) => e.stopPropagation()}>
                <LikePairButton 
                  bookstorePlaceId={activeBookstore.place_id}
                  activeCafePlaceId={cafe.place_id}
                  pairLikeId={cafe.pair_like_id}/>
              </button>}
          </div>
          </div>

          {openIds[cafe.place_id] && (
          <div className="px-1 pb-2">
            <PlaceDetailCard
            placeId={cafe.place_id}/>
            </div>)}
        </div>
      ))}

    </div>
    </>
  );
}
