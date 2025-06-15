// カードに必要な要素　名前、評価、
export function PlaceCard({ places }){
    return(
        <>
        {places.map(place => (
            <div key={place.id}>{place.name}</div>
        ))}
        </>
    )
}