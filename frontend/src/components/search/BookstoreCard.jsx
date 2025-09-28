import { useState } from 'react';
import { OpenMapAppButton } from '../search/OpenMapAppButton'
import { LikeButton } from './LikeButton';
import { getPlacePhotoUrl } from '../../lib/placePhoto';
import { PlaceDetailCard } from './PlaceDetailCard';




export function BookstoreCard({ 
    bookstores,
    onSelectBookstore,
    activeBookstore,
    onBookstoreClick }) {

  const [openIds, setOpenIds] = useState({});

  const detailedToggle = (id) =>{
    setOpenIds(prev => ({
        ...prev,
        [id]:!prev[id]
    }))
  }

  const handleBookstoreSelect = (bookstore) => {
    detailedToggle(bookstore.place_id)
    onSelectBookstore(bookstore)
    onBookstoreClick(bookstore)
    };


  return (
    <>
    {/* TODO: クリック時のカードのスタイルおよびカード自体のデザインの改変 */}
    <div className="grid grid-cols-1">
      {bookstores.map(bookstore => (  
        <div key={bookstore.place_id} 
          className={` rounded-r-xl shadow-sm ml-1 mb-1 ${activeBookstore?.place_id === bookstore.place_id? "border-l-5 border-primary-500 bg-primary-800 text-primary-50" : "text-primary-800 bg-primary-50 border-l-5 border-primary-300 "} `}
          onClick = {() => handleBookstoreSelect(bookstore)}>
          
          {/* 左サムネ + 右テキスト */}          
          <div className="flex items-start gap-3">
            {/* サムネ（正方形） */}
            <div className="shrink-0 overflow-hidden rounded-r-md ">
            <img
            src={getPlacePhotoUrl(bookstore.photo_ref)}
            alt="No image"
            loading="eager"
            className="w-17 h-17 object-cover"
            />
            </div>
            {/* 本文といいね */}
            <div className="flex items-center justify-between gap-3 p-1">
            <h2 className="text-lg font-semibold cursor-pointer "
            >
                {bookstore.name}
            </h2>

          <LikeButton 
              placeId={bookstore.place_id}
              type="Bookstore"
              likeId={bookstore.like_id}
          />
          
          </div>
          </div>

          {openIds[bookstore.place_id] && (
          <div className="px-1 pb-2">
            <PlaceDetailCard
            variant="bookstore"
            placeId={bookstore.place_id}/>
            </div>)}

          {/* {openIds[bookstore.place_id] && (
            <div 
            className={`${bookstore.place_id === activeBookstore?.place_id? "text-primary-50": "text-primary-800 "} h-6 w-6 rounded-full border p-1`}>
              <OpenMapAppButton 
              place={bookstore}/>
            </div>
          )} */}
          

          {/* {openIds[bookstore.id] && (
            <div className="text-sm mt-2">
                {bookstore.vicinity}
            </div>
          )} */}
        </div>
      ))}

    </div>
    </>
  );
}
