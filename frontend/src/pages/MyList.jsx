import { Fragment, useEffect, useState } from 'react';
import { fetchLikes, fetchPlaceDetailsBulk } from '../apis/places';
import { LikesList } from '../components/mylist/LikesList';
import { BackButton } from '../components/common/BackButton';
import { FooterNavigation } from '../components/layout/FooterNavigation';
import { toast } from 'react-toastify';
import { PairLikesList } from '../components/mylist/PairLikesList';
import GoogleMaps_Logo_Gray_1x from '../assets/GoogleMaps_Logo_Gray_1x.png'

export function MyList() {
  // 期待される値: [{place_id: {place_id, name, ...}}]
  const [placeDetails, setPlaceDetails] = useState({});
  const [cafes, setCafes] = useState([]);
  const [bookstores, setBookstores] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const notify = (status) => {
    if (status) toast.error('エラーが発生しました。ホームに戻ってください。');
  };

  useEffect(() => {
    const fetchLikedPlaces = async () => {
      setIsLoading(true);
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
        notify(error.response.status);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLikedPlaces();
  }, []);

  const TABS = [
    {
      key: 'bookstore',
      label: '本屋',
      likedPlaces: bookstores,
    },
    {
      key: 'cafe',
      label: 'カフェ',
      likedPlaces: cafes,
    },
    {
      key: 'pair',
      label: 'ペア',
      likedPlaces: pairs,
    },
  ];

  return (
    <>
      <div className="pb-16">
        <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
          <BackButton />
        </div>

        {/* INFO: DaisyUIのTabは.tabs直下に.tab-contentを期待するためFragmentで包む */}
        <div className="text-3xl mb-3 text-center font-bold">いいねリスト</div>
        <div className="tabs tabs-box justify-center mx-1">

          {TABS.map(({ key, label, likedPlaces }, index) => (
            <Fragment key={key}>
              <input
                type="radio"
                name="list"
                className="tab"
                aria-label={label}
                defaultChecked={index === 0}
              />
              <div className="tab-content">
                <img
                  src={GoogleMaps_Logo_Gray_1x}
                  alt="Google"
                  className='my-3 mx-2'/>    

                {key === 'bookstore' || key === 'cafe' ? (
                  <LikesList
                    placeDetails={placeDetails}
                    likedPlaces={likedPlaces}
                    isLoading={isLoading}
                    type={key}
                    label={label}
                  />
                ) : (
                  <PairLikesList
                    placeDetails={placeDetails}
                    likedPlaces={likedPlaces}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </Fragment>
          ))}
        </div>
        <FooterNavigation />
      </div>
    </>
  );
}

// placeDetailsはplace_idとその詳細情報をマッピング
// cafesなどはいいねされた中からカフェを抜いたもの
