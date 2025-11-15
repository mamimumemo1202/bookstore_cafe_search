import { useState } from 'react';
import { SearchBar } from './SearchByKeyword';
import { SearchButton } from '../search/SearchButton';
import { SearchModeSelector } from '../search/SearchModeSelector';
import { useLoading } from '../contexts/LoadingContext';

import { XMarkIcon } from '@heroicons/react/24/solid';

export function SearchModal({ onClose }) {
  const [searchMode, setSearchMode] = useState('bookstore');
  const { isLoading } = useLoading();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-base-100 rounded-xl p-6 max-w-2xl h-[70vh] w-11/12">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 rounded-xl">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )}
        <button
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-black"
          onClick={onClose}
        >
          <XMarkIcon className=" w-full h-full" />
        </button>

        <h1 className="text-xl mb-4">現在地からさがす</h1>
        <div className="flex items-center justify-center sm:flex-row gap-3">
          <SearchButton label={'本屋'} searchMode={'bookstore'} />
          <SearchButton label={'カフェ'} searchMode={'cafe'} />
        </div>

        <hr className="my-6 border-t border-base-300" />

        <h1 className="text-xl mb-5">住所・駅名・店舗名からさがす</h1>
        <div className="flex flex-col">
          <div className="mb-4">
            <SearchModeSelector setSearchMode={setSearchMode} searchMode={searchMode} />
          </div>
          <SearchBar searchMode={searchMode} />
        </div>
      </div>
    </div>
  );
}
