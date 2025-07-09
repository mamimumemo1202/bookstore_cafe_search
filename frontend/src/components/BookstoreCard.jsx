import { useState } from 'react';

// カードに必要な要素　名前、評価、
// ナビゲーションバーがあれば、カードはいらないかも

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

    const handlePrevBookstore = () => {
        const currentIndex = bookstores.findIndex(bookstore => bookstore.id === activeBookstore.id);
        if(currentIndex > 0){
        onSelectBookstore(bookstores[currentIndex-1]);
        }
    };

    const handleNextBookstore = () => {
        const currentIndex = bookstores.findIndex(bookstore => bookstore.id === activeBookstore.id);
        if(currentIndex < bookstores.length-1){
            onSelectBookstore(bookstores[currentIndex+1])
        }
    };    
  


  return (
    <>
      {/* ナビゲーションUI */}
      {/* 本屋の長さで次への位置が変わってうざい */}
      <div className="w-full p-4 bg-gray-100 flex justify-center items-center gap-4">
        <button onClick={handlePrevBookstore}>前へ</button>
        <div className="px-4 py-2 bg-white rounded shadow">
          {activeBookstore?.name || '書店を選択'}
        </div>
        <button onClick={handleNextBookstore}>次へ</button>
      </div>

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
