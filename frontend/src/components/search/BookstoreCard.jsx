import { useState } from 'react';
import { LikeButton } from './LikeButton';
import { getPlacePhotoUrl } from '../../lib/placePhoto';
import { PlaceDetailCard } from './PlaceDetailCard';

export function BookstoreCard({
  bookstores,
  onSelectBookstore,
  activeBookstore,
  canLoadMore,
  onLoadMore,
}) {
  const [openIds, setOpenIds] = useState({});

  const detailedToggle = (id) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBookstoreSelect = (bookstore) => {
    detailedToggle(bookstore.place_id);
    onSelectBookstore(bookstore);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 mb-3">
        {bookstores.map((bookstore) => (
          <div
            key={bookstore.place_id}
            className={` rounded-md shadow-md bg-base-100 ${activeBookstore?.place_id === bookstore.place_id ? '' : ''}`}
            onClick={() => handleBookstoreSelect(bookstore)}
          >
            {/* 左サムネ + 右テキスト */}
            <div className="flex gap-3">
              {/* サムネ（正方形） */}
              <div className="shrink-0 overflow-hidden rounded-md ">
                <img
                  src={getPlacePhotoUrl(bookstore.photo_ref)}
                  alt="No image"
                  loading="eager"
                  className="w-17 h-17 object-cover"
                />
              </div>
              {/* 本文といいね */}
              <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-semibold cursor-pointer ">{bookstore.name}</h2>

                <button
                  className="btn btn-square shrink-0 mr-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LikeButton
                    placeId={bookstore.place_id}
                    type="Bookstore"
                    likeId={bookstore.like_id}
                  />
                </button>
              </div>
            </div>

            {openIds[bookstore.place_id] && (
              <div className="px-1 pb-2">
                <PlaceDetailCard placeId={bookstore.place_id} />
              </div>
            )}
          </div>
        ))}
      </div>
      {canLoadMore? 
      <button 
      className="btn btn-sm mx-auto block mt-4"
      onClick={onLoadMore}>もっと見る</button>
      :
      <div className='text-center'>"すべての結果を表示中"</div>}
    </>
  );
}
