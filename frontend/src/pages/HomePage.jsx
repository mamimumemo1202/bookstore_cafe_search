import { useEffect, useState } from 'react';
import { SearchModal } from '../components/search/SearchModal';
import { Header } from '../components/layout/Header';
import { useLocation } from 'react-router-dom';
import { useModal } from '../components/contexts/ModalContext';
import { FooterNavigation } from '../components/layout/FooterNavigation';
import { SearchBar } from '../components/search/SearchByKeyword';
import { SearchModeSelector } from '../components/search/SearchModeSelector';
import { SearchButton } from '../components/search/SearchButton';

export function HomePage() {
  const location = useLocation();
  const { isOpenModal, closeModal } = useModal();
  const [ searchMode, setSearchMode] = useState("bookstore")

  return (
    <>
      <Header variant="home" />

      <div className="min-h-screen flex flex-col pt-16 pb-16 sm:flex-row">
        <div className='min-h-64 mx-5 bg-accent mt-5'>Logoが入る予定</div>

        <div className='flex flex-col text-center py-3'>
          <div>
            <p>本を買ったら、次はカフェで一息。</p>
            <p>お気に入りの本屋とカフェを探そう。</p>
          </div>
        </div>

        <div className='mx-5 flex flex-col gap-5'>
          <div className='chat chat-start'>
            <div className='chat-bubble'>
              <h1 className="text-xl mb-4">現在地からさがす</h1>
              <div className="flex items-center justify-center gap-3">
              <SearchButton label={'本屋'} searchMode={'bookstore'} />
              <SearchButton label={'カフェ'} searchMode={'cafe'} />
              </div>
            </div>
          </div>

          <div className='chat chat-end'>
            <div className='chat-bubble'>
              <h1 className="text-xl mb-5">住所・駅名・店舗名からさがす</h1>
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <SearchModeSelector setSearchMode={setSearchMode} searchMode={searchMode} />
                </div>
                <SearchBar searchMode={searchMode} />
              </div>
            </div>
          </div> 
        </div>
      </div>

      {isOpenModal && (
        <div className="">
          <SearchModal onClose={closeModal} />
        </div>
      )}
      <FooterNavigation />
    </>
  );
}
