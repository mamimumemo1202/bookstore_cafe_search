import { useState } from 'react';

// カードに必要な要素　名前、評価、
export function PlaceCard({ places, onSelectPlace }) {
  const [openIds, setOpenIds] = useState({});

  const detailedToggle = (id) =>{
    setOpenIds(prev => ({
        ...prev,
        [id]:!prev[id]
    }))
  }

  return (
    <>
    <div className="grid grid-cols-2">
      {places.map(place => (  
        <div key={place.id} className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h2
            className="text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => {
                detailedToggle(place.id);
                onSelectPlace(place)}
            }
          >
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
