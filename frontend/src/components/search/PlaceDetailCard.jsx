import { useEffect, useState } from 'react';
import { fetchPlaceDetails } from '../../apis/places';
import {
  MapPinIcon,
  GlobeAsiaAustraliaIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import noImage from '../../assets/no-image.png';
import { getPlacePhotoUrl } from '../../lib/placePhoto';
import { toast } from 'react-toastify';

export function PlaceDetailCard({ placeId }) {
  const [place, setPlace] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const notify= (status) => {
      if(status === 401) toast.info("ログインしてください") 
      else if (status === 400) toast.error("不正なリクエストです")
      else if(status) toast.error("予期せぬエラーです")
    }


  useEffect(() => {
    const placeDetails = async () => {
      try {
        setIsLoading(true)
        const res = await fetchPlaceDetails(placeId);
        setPlace(res);
      } catch (error) {
        notify(error.response.status)
      } finally{ setIsLoading(false) }
    };placeDetails()
  }, [placeId]);

  return (
    <>
      <div className="flex flex-col p-2">
        <div className="grid grid-cols-3 gap-3 py-5">
          
          { isLoading && (
            <>
          {[0,1,2].map((_, i) => (
            <div key={i} className="h-24 w-full bg-gray-200 rounded-md" />
          ))}
          </>)}

          {place?.photos?.length ? (
            place?.photos
              ?.slice(0, 3)
              .map((p, i) => (
                <img
                  key={i}
                  src={getPlacePhotoUrl(p.photo_reference)}
                  alt="place photo"
                  loading="eager"
                  className="h-24 w-full object-cover"
                />
              ))
          ) : (
            <img
              src={noImage}
              alt="No image"
              loading="eager"
              className={`col-span-3 h-24 w-full object-cover ${isLoading? "opacity-0" : "opacity-100" }`}
            />
          )}
        </div>

        <div className="flex gap-1">
          <MapPinIcon className="h-6 w-6" />
          {place.formatted_address}
        </div>
        <div className="flex gap-1">
          <GlobeAsiaAustraliaIcon className="w-6 h-6" />
          {place?.website ? (
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm"
            >
              {place.website}
            </a>
          ) : (
            'ウェブサイトはありません'
          )}
        </div>
        <div className="flex gap-1">
          <ClockIcon className="w-6 h-6" />
          <button
            className={`flex ${place.open_now ? 'text-success-500' : 'text-error-500'}`}
            onClick={(e) => (e.stopPropagation(), setOpenToggle((openToggle) => !openToggle))}
          >
            {place.open_now ? '営業中' : '営業時間外'}

            {openToggle ? (
              <ChevronUpIcon className="w-6 h-6" />
            ) : (
              <ChevronDownIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {openToggle && (
          <div className="mt-2 text-sm">
            {place?.opening_hours ? (
              place?.opening_hours['weekday_text'].map((h, i) => <div key={i}>  {h}</div>)
            ) : (
              <div className="text-primary-400">営業時間情報がありません</div>
            )}
          </div>
        )}

        <div className="flex gap-1">
          <StarIcon className="h-6 w-6" />
          <div>{place?.rating ? place.rating : '評価がありません'}</div>
        </div>

        <div>
          経路や詳しいレビューは
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            こちら
          </a>
        </div>
      </div>
    </>
  );
}
