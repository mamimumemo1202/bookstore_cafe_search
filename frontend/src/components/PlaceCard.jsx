// カードに必要な要素　名前、評価、
export function PlaceCard({ places }){
    return(
        <>
        {places.map(place => (
            <div key={place.id} className="bg-white rounded-xl shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{place.name}</h2>
            </div>
        ))}
        </>
    )
}