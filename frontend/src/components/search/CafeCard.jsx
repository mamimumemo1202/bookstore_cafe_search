import { useState } from 'react';
import { OpenMapAppButton } from '../search/OpenMapAppButton'


export function CafeCard ({ 
    cafes,
    onSelectCafe,
    activeCafe
   }){

    const [openIds, setOpenIds] = useState({});

    const detailedToggle = (id) =>{
    setOpenIds(prev => ({
        ...prev,
        [id]:!prev[id]
    }))
  };

  const handleCafeSelect = (cafe) => {
    detailedToggle(cafe.id)
    onSelectCafe(cafe)
  };

    return(
      <>
      {/* TODO: クリック時のカードのスタイルおよびカード自体のデザインの改変 */}
        <div className="grid grid-cols-2">
          {cafes.map(cafe => (  
            <div key={cafe.id} className={`rounded-xl shadow-md p-4 mb-4 ${activeCafe?.id === cafe.id? "bg-gray-700 text-white" : "bg-white"} `}>
              <h2 className="text-lg font-semibold cursor-pointer"
                onClick = { () =>handleCafeSelect(cafe)}>
                    {cafe.name}
              </h2>

              {openIds[cafe.id] && (
              <div 
              className={`${cafe.id === activeCafe?.id? "text-white border-white": "text-gray-800 border-gray-800"} h-6 w-6 rounded-full border p-1`}>
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