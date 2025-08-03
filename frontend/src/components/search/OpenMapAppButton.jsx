import { MapPinIcon } from "@heroicons/react/24/outline"

export function OpenMapAppButton({ place }){
    return(
        <>
        <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        >
        <MapPinIcon
        className="w-full h-full"/>   
        </a>
        </>
    )
}