export function getPlacePhotoUrl(photoRef) {
  if (!photoRef) return console.error("No image");

  return `http://localhost:3000/api/v1/photos?photo_ref=${encodeURIComponent(photoRef)}`;
}