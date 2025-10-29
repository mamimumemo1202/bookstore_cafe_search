import { LikeButton } from '../search/LikeButton';
import { LikePairButton } from '../search/LikePairButton';
import { useModal } from '../contexts/ModalContext';
import { SearchModal } from '../search/SearchModal';
import { useState } from 'react';
import { PlaceDetailCard } from '../search/PlaceDetailCard';
import { getPlacePhotoUrl } from '../../lib/placePhoto';
import { Skeleton } from '../search/Skelton';
import { useLoading } from '../contexts/LoadingContext';

export function LikeList({ placeDetails, cafes, bookstores, pairs }) {
  const { isOpenModal, closeModal } = useModal();
  const [openId, setOpenId] = useState(null);
  const { isLoading } = useLoading(null)

  const handleDetailToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      {isOpenModal && <SearchModal onClose={closeModal} />}

      <div>
        <div className="py-2">本屋</div>
        <div className="grid grid-cols-1">
          { isLoading && <><Skeleton /><Skeleton /></>}
          {bookstores?.length > 0 ? (
            bookstores?.map((like) => (
              <ul
                key={like.id}
                className="rounded-r-xl shadow-md p-4 mb-1 mr-1 border-l-5 text-primary-800 bg-primary-50 border-l-5 border-primary-300 "
                onClick={() => {
                  handleDetailToggle(like.id);
                }}
              >
                <li className="flex justify-between">
                  <div className="shrink-0 overflow-hidden rounded-r-md ">
                    <img
                      src={getPlacePhotoUrl(placeDetails[like.likeable?.place_id].photo_ref)}
                      alt="No image"
                      loading="eager"
                      className="w-17 h-17 object-cover"
                    />
                  </div>
                  <div className="text-lg font-semibold cursor-pointer">
                    {placeDetails[like.likeable?.place_id].name}
                  </div>
                  <button onClick={(e) => e.stopPropagation()}>
                    <LikeButton
                      placeId={like.likeable?.place_id}
                      type="Bookstore"
                      likeId={like.id}
                    />
                  </button>
                </li>

                {openId === like.id && <PlaceDetailCard placeId={like.likeable?.place_id} />}
              </ul>
            ))
          ) : (
            <div>いいねした本屋がありません</div>
          )}
        </div>
      </div>

      <div>
        <div className="py-2">カフェ</div>
        <div className="grid grid-cols-1">
          { isLoading && <><Skeleton /><Skeleton /></>}
          {cafes?.length > 0 ? (
            cafes?.map((like) => (
              <ul
                key={like.id}
                className="rounded-r-xl shadow-md p-4 mb-1 mr-1 border-l-5 text-primary-800 bg-primary-50 border-l-5 border-primary-300 "
                onClick={() => {
                  handleDetailToggle(like.id);
                }}
              >
                <li className="flex justify-between">
                  <div className="shrink-0 overflow-hidden rounded-r-md ">
                    <img
                      src={getPlacePhotoUrl(placeDetails[like.likeable?.place_id].photo_ref)}
                      alt="No image"
                      loading="eager"
                      className="w-17 h-17 object-cover"
                    />
                  </div>
                  <div className="text-lg font-semibold cursor-pointer">
                    {placeDetails[like.likeable?.place_id].name}
                  </div>
                  <button onClick={(e) => e.stopPropagation()}>
                    <LikeButton placeId={like.likeable.place_id} type="Cafe" likeId={like.id} />
                  </button>
                </li>

                {openId === like.id && <PlaceDetailCard placeId={like.likeable?.place_id} />}
              </ul>
            ))
          ) : (
            <div>いいねしたカフェがありません</div>
          )}
        </div>
      </div>

      <div>
        <div className="py-2">ペア</div>
        <div className="grid grid-cols-1">
          { isLoading && <><Skeleton /><Skeleton /></>}
          {pairs.length > 0 ? (
            pairs.map((like) => (
              <ul
                key={like.id}
                className="rounded-r-xl shadow-md p-4 mb-1 mr-1 border-l-5 text-primary-800 bg-primary-50 border-l-5 border-primary-300 "
                onClick={() => {
                  handleDetailToggle(like.id);
                }}
              >
                <li className="flex justify-between">
                  <div className="text-lg font-semibold cursor-pointer">
                    {placeDetails[like.likeable.bookstore.place_id]?.name} ×{' '}
                    {placeDetails[like.likeable.cafe.place_id]?.name}
                  </div>
                  <button onClick={(e) => e.stopPropagation()}>
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
            <div>いいねしたペアがありません</div>
          )}
        </div>
      </div>
    </>
  );
}
