import { MapPinIcon } from "@heroicons/react/24/outline"

export function OpenMapAppButton({ activeBookstore }){
    return(
        <>
        <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeBookstore?.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        >
        <MapPinIcon
        className="w-full h-full text-gray-800"/>   
        </a>
        </>
    )
}