import { useEffect, useState } from 'react';
import { fetchLikes, fetchPlaceDetailsBulk } from '../apis/places';
import { LikeList } from '../components/mylist/LikesList';
import { BackButton } from '../components/common/BackButton';
import { FooterNavigation } from '../components/layout/FooterNavigation';
import { toast } from 'react-toastify';
import { useLoading } from '../components/contexts/LoadingContext';
import { TextUnderlineIcon } from '@phosphor-icons/react';

export function MyList() {
  const [placeDetails, setPlaceDetails] = useState({});
  const [cafes, setCafes] = useState([]);
  const [bookstores, setBookstores] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false)


  const notify= (status) => {
    if(status) toast.error("エラーが発生しました。ホームに戻ってください。")
    }


  useEffect(() => {

    const fetchLikedPlaces = async () => {
      setIsLoading(true)
      try {
        const likes = await fetchLikes();

        const arr = likes.flatMap((item) => {
          if (item.likeable_type === 'Pair') {
            return [item.likeable?.bookstore.place_id, item.likeable?.cafe.place_id];
          } else {
            return item.likeable?.place_id;
          }
        });

        const details = await fetchPlaceDetailsBulk(arr);

        const detailsMap = {};
        details.forEach((d) => (detailsMap[d.place_id] = d));
        setPlaceDetails(detailsMap);

        setCafes(likes.filter((like) => like.likeable_type === 'Cafe'));
        setBookstores(likes.filter((like) => like.likeable_type === 'Bookstore'));
        setPairs(likes.filter((like) => like.likeable_type === 'Pair'));
      } catch (error) {
       notify(error.response.status)
      } finally { setIsLoading(false) }
    };
    fetchLikedPlaces();
  }, []);

  return (
    <>
      <div className="pb-16">
        <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
          <BackButton />
        </div>

        <LikeList
          placeDetails={placeDetails}
          cafes={cafes}
          bookstores={bookstores}
          pairs={pairs}
          isLoading={isLoading}
        />
        <FooterNavigation />
      </div>
    </>
  );
}

// placeDetailsはplace_idとその詳細情報をマッピング
// cafesなどはいいねされた中からカフェを抜いたもの
