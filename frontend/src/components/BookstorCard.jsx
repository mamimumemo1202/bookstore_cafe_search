import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { OpenMapAppButton } from '../components/OpenMapAppButton'


export function BookstoreCard({ 
    bookstores,
    onSelectBookstore,
    activeBookstore, }) {

  const [openIds, setOpenIds] = useState({});

  const detailedToggle = (id) =>{
    setOpenIds(prev => ({
        ...prev,
        [id]:!prev[id]
    }))
  }

  const handleBookstoreSelect = (bookstore) => {
    detailedToggle(bookstore.id)
    onSelectBookstore(bookstore)
    };


  return (
    <>
    {/* TODO: クリック時のカードのスタイルおよびカード自体のデザインの改変 */}
    <div className="grid grid-cols-2">
      {bookstores.map(bookstore => (  
        <div key={bookstore.id} 
        className={`rounded-xl shadow-md p-4 mb-4 ${activeBookstore?.id === bookstore.id? "bg-gray-700 text-white" : "bg-white"} `}>
          <h2 className="text-lg font-semibold  cursor-pointer"
            onClick = { () =>handleBookstoreSelect(bookstore)}>
                {bookstore.name}
          </h2>
          {openIds[bookstore.id] && (
            <div 
            className={`${bookstore.id === activeBookstore?.id? "text-white border-white": "text-gray-800 border-gray-800"} h-6 w-6 rounded-full border p-1`}>
              <OpenMapAppButton 
              place={bookstore}/>
            </div>
          )}
          

          {/* {openIds[bookstore.id] && (
            <div className="text-sm mt-2">
                {bookstore.vicinity}
            </div>
          )} */}
        </div>
      ))}

    </div>
    </>
  );
}
