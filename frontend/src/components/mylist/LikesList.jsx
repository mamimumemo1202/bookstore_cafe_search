import { LikeButton } from '../search/LikeButton';
import { LikePairButton } from '../search/LikePairButton';
import { useModal } from '../contexts/ModalContext';
import { SearchModal } from '../search/SearchModal';
import { useState } from 'react';
import { PlaceDetailCard } from '../search/PlaceDetailCard';
import { getPlacePhotoUrl } from '../../lib/placePhoto';
import { CardSkeleton } from '../search/Skeleton';


export function LikesList({ placeDetails, likedPlaces, isLoading, type, label }) {
  const { isOpenModal, closeModal } = useModal();
  const [openId, setOpenId] = useState(null);

  const handleDetailToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      {isOpenModal && <SearchModal onClose={closeModal} />}

      <div>
        <div className="grid grid-cols-1 gap-2">
          { isLoading && <><CardSkeleton /><CardSkeleton /></>}

          { likedPlaces?.length > 0 ? (
            likedPlaces?.map((like) => (
              <ul
                key={like.id}
                className="rounded-xl shadow-md bg-base-100"
                onClick={() => {
                  handleDetailToggle(like.id);
                }}
              >
                <li className="flex justfy-center">
                  <div className="shrink-0 overflow-hidden rounded-md ">
                    <img
                      src={getPlacePhotoUrl(placeDetails[like.likeable?.place_id].photo_ref)}
                      alt="No image"
                      loading="eager"
                      className="w-17 h-17 object-cover"
                    />
                  </div>
                  <div className="text-lg font-semibold cursor-pointer p-2">
                    {placeDetails[like.likeable?.place_id].name}
                  </div>
                </li>

                {openId === like.id && 
                <PlaceDetailCard 
                  placeId={like.likeable?.place_id}
                  type={type}
                  likeId={like.id} />}
              </ul>
            ))
          ) : (
            <div className={` my-2 ${isLoading? "hidden" : " "}`}>いいねした{label}がありません</div>
          )}
        </div>
      </div>
    </>
  );
} 
