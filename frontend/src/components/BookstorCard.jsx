// 使ってないコンポーネント
// 今後必要そうなので切り出し

import { useState } from 'react';

export function BookstoreCard({ 
    bookstores,
    onSelectBookstore,
    activeBookstore }) {

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

      {/* なびげーしょんできたらこのカードはいらない
      書店一覧ボタンを設けて一覧を取得できるようにするのはあり（） */}
    <div className="grid grid-cols-2">
      {bookstores.map(bookstore => (  
        <div key={bookstore.id} className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 cursor-pointer"
            onClick = { () =>handleBookstoreSelect(bookstore)}>
                {bookstore.name}
          </h2>

          {openIds[bookstore.id] && (
            <div className="text-sm text-gray-600 mt-2">
                {bookstore.vicinity}
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
}
