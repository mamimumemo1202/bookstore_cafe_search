import { HeartIcon } from '@heroicons/react/24/solid';
import { likePlace, unlikePlace } from '../../apis/places';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom';

export function LikeButton({ placeId, type, likeId }) {
  const [liked, setLiked] = useState(false);
  const [currentLikeId, setCurrentLikeId] = useState(likeId);
  const { isLoading } = useAuthContext()
  const navigate = useNavigate();

  const notify = (status) => {
    if (status === 401) toast.info('ログインしてください');
    else if (status === 400) toast.error('不正なリクエストです');
    else if (status) toast.error('予期せぬエラーです');
  };

  useEffect(() => {
    setLiked(!!likeId);
  }, [likeId]);

  const handleLike = async () => {
    const prev = liked;

    if(isLoading) {
    setLiked(!liked)
    } else {
      navigate('/auth')
    }

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
      notify(error.response.status);
      setLiked(prev);
    }
  };

  return (
    <>
    <div
     onClick={() => handleLike()}>
      <HeartIcon
        className={`w-6 h-6 ${liked ? 'text-accent-500' : 'text-white'}`}
      />
    </div>
    </>
  );
}
