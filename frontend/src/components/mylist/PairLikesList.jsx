import { LikePairButton } from '../search/LikePairButton';
import { useModal } from '../contexts/ModalContext';
import { SearchModal } from '../search/SearchModal';
import { useState } from 'react';
import { PlaceDetailCard } from '../search/PlaceDetailCard';
import { CardSkeleton } from '../search/Skeleton';


export function PairLikesList({ placeDetails, likedPlaces, isLoading, type, label }) {
  const { isOpenModal, closeModal } = useModal();
  const [openId, setOpenId] = useState(null);

  const handleDetailToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      {isOpenModal && <SearchModal onClose={closeModal} />}

      <div>
        <div className="grid grid-cols-1">
          { isLoading && <><CardSkeleton /><CardSkeleton /></>}
          { likedPlaces.length > 0 ? (
            likedPlaces?.map((like) => (
              <ul
                key={like.id}
                className="rounded-xl shadow-md bg-base-100"
                onClick={() => {
                  handleDetailToggle(like.id);
                }}
              >
                <li className="flex justify-between">
                  <div className="text-lg font-semibold cursor-pointer p-2">
                    {/* TODO: アイコンに差し替え */}
                    <p>本屋: {placeDetails[like.likeable.bookstore.place_id]?.name}</p>
                    <p>カフェ: {placeDetails[like.likeable.cafe.place_id]?.name}</p>
                  </div>
                  <button 
                  onClick={(e) => e.stopPropagation()}
                  className='mr-5'>
                    <LikePairButton
                      bookstorePlaceId={like.likeable.bookstore.place_id}
                      activeCafePlaceId={like.likeable.cafe.place_id}
                      pairLikeId={like.id}
                    />
                  </button>
                </li>

                  {openId === like.id && (
                    <div className="px-1 pb-2">
                      <div className="font-semibold">本屋</div>
                      <PlaceDetailCard placeId={like.likeable.bookstore.place_id} />
                      <div className="font-semibold mt-4">カフェ</div>
                      <PlaceDetailCard placeId={like.likeable.cafe.place_id} />
                    </div>
                  )}
                
              </ul>
            ))
          ) : (
            <div className={`${isLoading? "hidden" : " "}`}>いいねしたペアがありません</div>
          )}
        </div>
      </div>
    </>
  );
}
