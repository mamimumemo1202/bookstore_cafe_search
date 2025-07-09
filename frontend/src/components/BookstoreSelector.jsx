import { useState } from 'react';

export function BookstoreSelector({ 
    bookstores,
    onSelectBookstore,
    activeBookstore }) {

  const [openIds, setOpenIds] = useState({});

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
      <div className="w-full p-4 bg-gray-100 flex justify-center items-center gap-4">
        <button onClick={handlePrevBookstore}>前へ</button>
        <div className="w-5/6 px-4 py-2 bg-white rounded shadow">
          <div className="flex justify-center items-center">
          {activeBookstore && currentBookstoreIndex >= 0 ? `${activeBookstore.name} (${currentBookstoreIndex + 1 }/${bookstoresLength})` : '読み込み中'}
          </div>
        </div>
        <button onClick={handleNextBookstore}>次へ</button>
      </div>
    </>
  );
}
