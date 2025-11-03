import { useState } from 'react';
import { SearchModal } from '../components/search/SearchModal';
import { Header } from '../components/layout/Header';
import { useModal } from '../components/contexts/ModalContext';
import { FooterNavigation } from '../components/layout/FooterNavigation';
import { SearchBar } from '../components/search/SearchByKeyword';
import { SearchModeSelector } from '../components/search/SearchModeSelector';
import { SearchButton } from '../components/search/SearchButton';
import { Logo } from '../components/common/Logo';

export function HomePage() {
  const { isOpenModal, closeModal } = useModal();
  const [ searchMode, setSearchMode] = useState("bookstore")

  return (
    <>
    <div className='mt-16 flex flex-1 flex-col items-center justify-center px-6'>
      <Header variant="home" />

      <div className="flex flex-col sm:flex-row">
        <div className='flex-1 flex flex-col sm:flex-row'>

          <div className='flex mt-5 mr-7'>
            <Logo variant="home"/>

            <div className="flex flex-col text-center justify-center">
              <h1 className="text-3xl font-bold">ほんカフェマップ</h1>
              <p className="text-xs mb-2">Bookstore Cafe Map</p>
              <p className="text-sm whitespace-nowrap">本を買ったら、次はカフェで一息。</p>
              <p className="text-sm whitespace-nowrap">お気に入りの本屋とカフェを探そう。</p>
            </div>
          </div>

          <div className="h-px w-20 mx-auto bg-neutral-200/80 my-5" />

          <div className='m-5 flex flex-col gap-5'>
                <h1 className="text-xl">現在地からさがしてみる</h1>
                <div className="flex items-center justify-center gap-3">
                <SearchButton label={'本屋'} searchMode={'bookstore'} />
                <SearchButton label={'カフェ'} searchMode={'cafe'} />
            </div>

          <div className="h-px w-16 mx-auto bg-neutral-200/80 my-5" />

                <h1 className="text-xl">住所・駅名・店舗名からさがす</h1>
                <div className="flex flex-col items-center gap-4">
                  <div className="">
                    <SearchModeSelector setSearchMode={setSearchMode} searchMode={searchMode} />
                  </div>
                  <SearchBar searchMode={searchMode} />
                </div> 
          </div>
        </div>
      </div>


      {isOpenModal && (
          <SearchModal onClose={closeModal} />
      )}
      <FooterNavigation />
    </div>
    </>
  );
}
