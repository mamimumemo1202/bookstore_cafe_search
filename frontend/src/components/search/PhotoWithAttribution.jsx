import noImage from '../../assets/no-image.png';
import { getPlacePhotoUrl } from '../../lib/placePhoto';

export function PhotoWithAttribution({
  photoRef,
  photoAttribution,
  imgClassName = 'w-full h-full object-cover',
  wrapperClassName = '',
  alt = 'place photo',
  loading = 'eager',
}) {
  const src = getPlacePhotoUrl(photoRef) || noImage;

  return (
    <div className={`relative ${wrapperClassName}`.trim()}>
      <img src={src} alt={alt} loading={loading} className={imgClassName} />
      {photoAttribution ? (
        <div className="absolute bottom-0 left-0 w-full bg-black/55 text-[10px] text-white px-1 py-0.5 leading-tight">
          <span>&copy; </span>
          <span dangerouslySetInnerHTML={{ __html: photoAttribution }} />
        </div>
      ) : null}
    </div>
  );
}
