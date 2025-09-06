import { useState } from 'react';
import { OpenMapAppButton } from '../search/OpenMapAppButton'
import { LikeButton } from './LikeButton';


export function CafeCard ({ 
    cafes,
    onSelectCafe,
    activeCafe,
    onClick,
   }){

    const [openIds, setOpenIds] = useState({});

    const detailedToggle = (id) =>{
    setOpenIds(prev => ({
        ...prev,
        [id]:!prev[id]
    }))
  };

  const handleCafeSelect = (cafe) => {
    detailedToggle(cafe.place_id)
    onSelectCafe(cafe)
    onClick(cafe)
  };

    return(
      <>
      {/* TODO: クリック時のカードのスタイルおよびカード自体のデザインの改変 */}
        <div className="grid grid-cols-1">
          {cafes.map(cafe => (  
            <div key={cafe.place_id} className={`rounded-r-xl shadow-md p-4 mb-1 mr-1 ${activeCafe?.place_id === cafe.place_id? "border-l-5 border-primary-500 bg-primary-800 text-primary-50" : "text-primary-800 bg-primary-50 border-l-5 border-primary-300 "} `}>
              <h2 className="text-lg font-semibold cursor-pointer"
                onClick = { () => handleCafeSelect(cafe)}>
                    {cafe.name}
              </h2>
              <p><LikeButton
                  placeId={cafe.place_id}
                  type="Cafe"
                  likeId={cafe.like_id}/></p>

              {openIds[cafe.id] && (
              <div 
              className={`${cafe.place_id === activeCafe?.place_id? "text-primary-50": "text-primary-800 "} h-6 w-6 rounded-full border p-1`}>
              <OpenMapAppButton 
              place={cafe}/>
              </div>                
              // <div className="text-sm text-gray-600 mt-2">
              //     {cafe.vicinity}
              // </div>
                
              )}
            </div>
          ))}
        </div>
      </>
    )
} 