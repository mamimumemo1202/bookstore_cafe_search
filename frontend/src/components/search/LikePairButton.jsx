import { CloverIcon } from '@phosphor-icons/react';
import { likePair, unlikePlace } from '../../apis/places';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom';

export function LikePairButton({ bookstorePlaceId, activeCafePlaceId, pairLikeId }) {
  const [liked, setLiked] = useState(false);
  const { isLoading } = useAuthContext()
  const navigate = useNavigate();

  const notify = (status) => {
    if (status === 401) toast.info('ログインしてください');
    else if (status === 400) toast.error('不正なリクエストです');
    else if (status) toast.error('予期せぬエラーです');
  };

  useEffect(() => {
    setLiked(!!pairLikeId);
  }, [pairLikeId]);

  const handleLike = async () => {
    const prev = liked;

    if(isLoading) {
    setLiked(!liked)
    } else {
      navigate('/auth')
    }

    try {
      prev ? await unlikePlace(pairLikeId) : await likePair(bookstorePlaceId, activeCafePlaceId);
    } catch (error) {
      notify(error.response.status);
      setLiked(prev);
    }
  };

  return (
    <>
    <div onClick={() => handleLike()}>
      <CloverIcon
        weight="fill"
        color={`${liked ? '#6CA20C' : '#FFFFFF'}`}
        className="w-6 h-6"/>
    </div>
    </>
  );
}
