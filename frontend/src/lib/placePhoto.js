export function getPlacePhotoUrl(photoRef) {
  if (!photoRef) return null;

  return `http://localhost:3000/api/v1/photos?photo_ref=${encodeURIComponent(photoRef)}`;
}
