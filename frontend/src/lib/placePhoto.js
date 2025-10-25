export function getPlacePhotoUrl(photoRef) {
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  if (!photoRef) return null;

  return `${BASE_URL}/photos?photo_ref=${encodeURIComponent(photoRef)}`;
}
