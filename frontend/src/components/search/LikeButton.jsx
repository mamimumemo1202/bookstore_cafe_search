// TODO: 解除1->いいね->解除2をすると解除1のlike_idを送ってエラーがでる（本屋、カフェ共通）

import { HeartIcon } from '@heroicons/react/24/solid';
import { likePlace, unlikePlace } from '../../apis/places';
import { useEffect, useState } from 'react';

export function LikeButton({ placeId, type, likeId }) {
  const [liked, setLiked] = useState(false);
  const [currentLikeId, setCurrentLikeId] = useState(likeId);

  useEffect(() => {
    setLiked(!!likeId);
  }, [likeId]);

  const handleLike = async () => {
    const prev = liked;
    setLiked(!liked);

    try {
      if (prev) {
        await unlikePlace(currentLikeId);
        setCurrentLikeId(null);
        setLiked(false);
      } else {
        const res = await likePlace(placeId, type);
        setCurrentLikeId(res);
        setLiked(true);
      }
    } catch (error) {
      console.error(error);
      setLiked(prev);
    }
  };

  return (
    <>
      <HeartIcon
        className={`w-6 h-6 ${liked ? 'text-accent-500' : 'text-accent-100'}`}
        onClick={() => handleLike()}
      />
    </>
  );
}
