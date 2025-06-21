// 今後BookstoreCard, CafeCardに分ける可能性あり

import { useState } from 'react';

// カードに必要な要素　名前、評価、
export function PlaceCard({ 
    bookstores,
    cafes,
    type,
    onSelectBookstore, 
    onSelectCafe }) {
  const [openIds, setOpenIds] = useState({});
  const places = bookstores || cafes || [];

  const detailedToggle = (id) =>{
    setOpenIds(prev => ({
        ...prev,
        [id]:!prev[id]
    }))
  }

  const onSelectBookstoreOrCafe = (place) => {
    detailedToggle(place.id)
    if(type === 'bookstore'){
        onSelectBookstore(place)
    } else if (type === 'cafe'){
        onSelectCafe(place)
    };
  }

  return (
    <>
    <div className="grid grid-cols-2">
      {places.map(place => (  
        <div key={place.id} className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 cursor-pointer"
            onClick = { () =>onSelectBookstoreOrCafe(place)}>
                {place.name}
          </h2>

          {openIds[place.id] && (
            <div className="text-sm text-gray-600 mt-2">
                {place.vicinity}
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
}
