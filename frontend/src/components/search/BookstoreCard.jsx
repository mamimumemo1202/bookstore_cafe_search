import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { OpenMapAppButton } from '../search/OpenMapAppButton'
import { LikeButton } from './LikeButton';


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
    detailedToggle(bookstore.place_id)
    onSelectBookstore(bookstore)
    };


  return (
    <>
    {/* TODO: クリック時のカードのスタイルおよびカード自体のデザインの改変 */}
    <div className="grid grid-cols-1">
      {bookstores.map(bookstore => (  
        <div key={bookstore.place_id} 
        className={` rounded-r-xl shadow-sm p-4 ml-1 mb-1 ${activeBookstore?.place_id === bookstore.place_id? "border-l-5 border-primary-500 bg-primary-800 text-primary-50" : "text-primary-800 bg-primary-50 border-l-5 border-primary-300 "} `}>
          <h2 className="text-lg font-semibold  cursor-pointer"
            onClick = { () =>handleBookstoreSelect(bookstore)}>
                {bookstore.name}
          </h2>
          <p><LikeButton/></p>
          {openIds[bookstore.place_id] && (
            <div 
            className={`${bookstore.place_id === activeBookstore?.place_id? "text-primary-50": "text-primary-800 "} h-6 w-6 rounded-full border p-1`}>
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
