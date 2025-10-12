// 写真、店舗名、評価、営業時間、住所、オリジナル情報（ペアの時の距離）
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

export function PlaceDetailCard({ placeId }) {
  const [place, setPlace] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);

  const placeDetails = async () => {
    const res = await fetchPlaceDetails(placeId);
    setPlace(res);
  };

  useEffect(() => {
    placeDetails();
  }, [placeId]);

  return (
    <>
      <div className="flex flex-col p-2">
        <div className="flex gap-3 py-5">
          {place?.photos?.length ? (
            place?.photos
              ?.slice(0, 3)
              .map((p, i) => (
                <img
                  key={i}
                  src={getPlacePhotoUrl(p.photo_reference)}
                  alt="No image"
                  loading="eager"
                  className="w-32 h-32 object-cover"
                />
              ))
          ) : (
            <img
              src={noImage}
              alt="No image"
              loading="eager"
              className="w-32 h-auto object-cover"
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
              place?.opening_hours['weekday_text'].map((h, i) => <div key={i}>　　{h}</div>)
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
