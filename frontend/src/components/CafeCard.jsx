import { useState } from 'react';


export function CafeCard ({ 
    cafes,
    onSelectCafe }){

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
    <div className="grid grid-cols-2">
      {cafes.map(cafe => (  
        <div key={cafe.id} className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 cursor-pointer"
            onClick = { () =>handleCafeSelect(cafe)}>
                {cafe.name}
          </h2>

          {openIds[cafe.id] && (
            <div className="text-sm text-gray-600 mt-2">
                {cafe.vicinity}
            </div>
          )}
        </div>
      ))}
    </div>
    </>
    )
} 