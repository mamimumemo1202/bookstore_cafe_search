import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

export function BookstoreSelector({ bookstores, onSelectBookstore, activeBookstore }) {
  const bookstoresLength = bookstores.length;
  const currentBookstoreIndex = activeBookstore
    ? bookstores.findIndex((bookstore) => bookstore.place_id === activeBookstore.place_id)
    : -1;

  const handlePrevBookstore = () => {
    const prevBookstoreIndex = (currentBookstoreIndex - 1 + bookstores.length) % bookstores.length;
    onSelectBookstore(bookstores[prevBookstoreIndex]);
  };

  const handleNextBookstore = () => {
    const nextBookstoreIndex = (currentBookstoreIndex + 1 + bookstores.length) % bookstores.length;
    onSelectBookstore(bookstores[nextBookstoreIndex]);
  };

  return (
    <>
      <div className="w-full p-4 bg-gray-100 flex justify-center items-center gap-4">
        <ChevronLeftIcon className="w-5 h-5" onClick={handlePrevBookstore} />
        <div className="w-5/6 px-4 py-2 bg-white rounded shadow">
          <div className="flex justify-center items-center">
            {activeBookstore && currentBookstoreIndex >= 0
              ? `${activeBookstore.name} (${currentBookstoreIndex + 1}/${bookstoresLength})`
              : '読み込み中'}
          </div>
        </div>
        <ChevronRightIcon className="w-5 h-5" onClick={handleNextBookstore} />
      </div>
    </>
  );
}
