import { useEffect, useState } from 'react';
import { SearchBar } from './SearchByKeyword';
import { SearchButton } from '../search/SearchButton';
import { SearchModeSelector } from '../search/SearchModeSelector';
import { useLoading } from '../contexts/LoadingContext';
import { CloverIcon } from "@phosphor-icons/react";

import { XMarkIcon } from '@heroicons/react/24/solid';

export function SearchModal({ onClose }) {
  const [searchMode, setSearchMode] = useState('bookstore');
  const { isLoading, startLoading } = useLoading();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-2xl h-[70vh] w-11/12">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-white/80 text-gray-700">
          <CloverIcon size={32} className='animate-bounce'/>
            <p className="text-sm">検索中...</p>
        </div>
        )}
        <button
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-black"
          onClick={onClose}
        >
          <XMarkIcon className=" w-full h-full" />
        </button>

        <div className="">
          <h1 className="text-xl mb-4">現在地からさがす</h1>
          <div className="flex flex-col justify-center sm:flex-row">
            <SearchButton label={'本屋'} searchMode={'bookstore'} />
            <SearchButton label={'カフェ'} searchMode={'cafe'} />
          </div>

          <hr className="my-6 border-t border-gray-300" />
          <h1 className="text-xl mb-5">住所・駅名・店舗名からさがす</h1>
          <div className="flex flex-col">
            <div className="mb-4">
              <SearchModeSelector setSearchMode={setSearchMode} searchMode={searchMode} />
            </div>
            <SearchBar searchMode={searchMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
