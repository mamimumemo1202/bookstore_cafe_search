import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

export function BookstoreSelector({ bookstores, onSelectBookstore, activeBookstore }) {
  const hasList = bookstores.length > 0;
  const foundIndex = activeBookstore
    ? bookstores.findIndex((bookstore) => bookstore.place_id === activeBookstore.place_id)
    : -1;
  const currentBookstoreIndex = foundIndex;
  const displayIndex = foundIndex >= 0 ? foundIndex : 0;
  const totalDisplay = hasList ? bookstores.length : activeBookstore ? 1 : 0;

  const handlePrevBookstore = () => {
    if (!hasList) return;
    const prevBookstoreIndex = (currentBookstoreIndex - 1 + bookstores.length) % bookstores.length;
    onSelectBookstore(bookstores[prevBookstoreIndex]);
  };

  const handleNextBookstore = () => {
    if (!hasList) return;
    const nextBookstoreIndex = (currentBookstoreIndex + 1 + bookstores.length) % bookstores.length;
    onSelectBookstore(bookstores[nextBookstoreIndex]);
  };

  return (
    <>
      <div className="w-full p-4 bg-base-100 flex justify-center items-center gap-4">
        <ChevronLeftIcon
          className={`w-5 h-5 ${!hasList ? 'opacity-40 cursor-not-allowed' : ''}`}
          onClick={handlePrevBookstore}
        />
        <div className="w-5/6 px-4 py-2 bg-white rounded shadow">
          <div className="flex justify-center items-center">
            {activeBookstore
              ? `${activeBookstore.name} (${displayIndex + 1}/${totalDisplay})`
              : '読み込み中'}
          </div>
        </div>
        <ChevronRightIcon
          className={`w-5 h-5 ${!hasList ? 'opacity-40 cursor-not-allowed' : ''}`}
          onClick={handleNextBookstore}
        />
      </div>
    </>
  );
}
