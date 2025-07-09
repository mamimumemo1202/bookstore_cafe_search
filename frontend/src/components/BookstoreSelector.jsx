import { useState } from 'react';

// カードに必要な要素　名前、評価、
// ナビゲーションバーがあれば、カードはいらないかも

export function BookstoreSelector({ 
    bookstores,
    onSelectBookstore,
    activeBookstore }) {

  const [openIds, setOpenIds] = useState({});

  // const detailedToggle = (id) =>{
  //   setOpenIds(prev => ({
  //       ...prev,
  //       [id]:!prev[id]
  //   }))
  // }

  // const handleBookstoreSelect = (bookstore) => {
  //   detailedToggle(bookstore.id)
  //   onSelectBookstore(bookstore)
  //   };

    const bookstoresLength = bookstores.length 
    const currentBookstoreIndex = activeBookstore? bookstores.findIndex(bookstore => bookstore.id === activeBookstore.id): -1;

    
    const handlePrevBookstore = () => {
        const prevBookstoreIndex = (currentBookstoreIndex - 1 + bookstores.length) % bookstores.length
        onSelectBookstore(bookstores[prevBookstoreIndex])
    };

    const handleNextBookstore = () => {
        const nextBookstoreIndex = (currentBookstoreIndex + 1) % bookstores.length
        onSelectBookstore(bookstores[nextBookstoreIndex]) 
    };
    

    
  


  return (
    <>
      {/* ナビゲーションUI 後で切り出すよ */}
      
      <div className="w-full p-4 bg-gray-100 flex justify-center items-center gap-4">
        <button onClick={handlePrevBookstore}>前へ</button>
        <div className="w-5/6 px-4 py-2 bg-white rounded shadow">
          <div className="flex justify-center items-center">
          {activeBookstore && currentBookstoreIndex >= 0 ? `${activeBookstore.name} (${currentBookstoreIndex + 1 }/${bookstoresLength})` : '読み込み中'}
          </div>
        </div>
        <button onClick={handleNextBookstore}>次へ</button>
      </div>
      {/* なびげーしょんできたらこのカードはいらない
      書店一覧ボタンを設けて一覧を取得できるようにするのはあり（） */}
    {/* <div className="grid grid-cols-2">
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
    </div> */}
    </>
  );
}
