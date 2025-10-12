import { useEffect, useState } from 'react';
import { fetchLikes, fetchPlaceDetailsBulk } from '../apis/places';
import { LikeList } from '../components/mylist/LikesList';
import { BackButton } from '../components/common/BackButton';
import { FooterNavigation } from '../components/layout/FooterNavigation';

export function MyList() {
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [placeDetails, setPlaceDetails] = useState({});
  const [cafes, setCafes] = useState([]);
  const [bookstores, setBookstores] = useState([]);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    const fetchLikedPlaces = async () => {
      try {
        const likes = await fetchLikes();
        setLikedPlaces(likes);

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
        console.error(error);
      }
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
          likedPlaces={likedPlaces}
          placeDetails={placeDetails}
          cafes={cafes}
          bookstores={bookstores}
          pairs={pairs}
        />
        <FooterNavigation />
      </div>
    </>
  );
}

// placeDetailsはplace_idとその詳細情報をマッピング
// cafesなどはいいねされた中からカフェを抜いたもの
