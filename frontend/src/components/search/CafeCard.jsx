import { useState } from 'react';
import { LikeButton } from './LikeButton';
import { LikePairButton } from './LikePairButton';
import { getPlacePhotoUrl } from '../../lib/placePhoto';
import { PlaceDetailCard } from './PlaceDetailCard';

export function CafeCard({ cafes, onSelectCafe, activeBookstore, onClick, activecafe }) {
  const [openIds, setOpenIds] = useState({});

  const detailedToggle = (id) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCafeSelect = (cafe) => {
    detailedToggle(cafe.place_id);
    onSelectCafe(cafe);
    onClick(cafe);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        {cafes.map((cafe) => (
          <div
            key={cafe.place_id}
            className={` rounded-md shadow-md bg-base-100${activecafe?.place_id === cafe.place_id ? '' : ''} `}
            onClick={() => handleCafeSelect(cafe)}
          >
            {/* 左サムネ + 右テキスト */}
            <div className="flex gap-3">
              {/* サムネ（正方形） */}
              <div className="shrink-0 overflow-hidden rounded-md ">
                <img
                  src={getPlacePhotoUrl(cafe.photo_ref)}
                  alt="No image"
                  loading="eager"
                  className="w-17 h-17 object-cover"
                />
              </div>
              {/* 本文といいね */}
              <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-semibold cursor-pointer ">{cafe.name}</h2>

                <div className='flex gap-3 mx-3'>
                <button className='btn btn-square shrink-0' onClick={(e) => e.stopPropagation()}>
                  <LikeButton placeId={cafe.place_id} type="cafe" likeId={cafe.like_id} />
                </button>

                {activeBookstore && (
                  <button className='btn btn-square shrink-0' onClick={(e) => e.stopPropagation()}>
                    <LikePairButton
                      bookstorePlaceId={activeBookstore.place_id}
                      activeCafePlaceId={cafe.place_id}
                      pairLikeId={cafe.pair_like_id}
                    />
                  </button>
                )}
                </div>
              </div>
            </div>

            {openIds[cafe.place_id] && (
              <div className="px-1 pb-2">
                <PlaceDetailCard placeId={cafe.place_id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
