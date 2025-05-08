
export function PlaceCard({ places }){
    return(
        <>
        {places.map(place => (
            <div key={place.id}>{place.name}</div>
        ))}
        </>
    )
}