// TODO: 解除1->いいね->解除2をすると解除1のlike_idを送ってエラーがでる（本屋、カフェ共通）

import { HeartIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid';
import { likePair, unlikePlace } from '../../apis/places';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


export function LikePairButton({ bookstorePlaceId, activeCafePlaceId, pairLikeId }) {
  const [liked, setLiked] = useState(false);

  const notify= (status) => {
    if(status === 401) toast.info("ログインしてください") 
    else if (status === 400) toast.error("不正なリクエストです")
    else if(status) toast.error("予期せぬエラーです")
  }

  useEffect(() => {
    setLiked(!!pairLikeId);
  }, [pairLikeId]);

  const handleLike = async () => {
    const prev = liked;
    setLiked(!liked);

    try {
      prev ? await unlikePlace(pairLikeId) : await likePair(bookstorePlaceId, activeCafePlaceId);
    } catch (error) {
       notify(error.response.status)
       setLiked(prev);
    }
  };

  return (
    <>
      <PuzzlePieceIcon
        className={`w-6 h-6 ${liked ? 'text-accent-500' : 'text-accent-100'}`}
        onClick={() => handleLike()}
      />
    </>
  );
}
