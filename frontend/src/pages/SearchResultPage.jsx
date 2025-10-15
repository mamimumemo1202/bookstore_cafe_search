import { useState, useEffect } from 'react';
import { PlacesMap } from '../components/search/PlacesMap';
import { BookstoreSelector } from '../components/search/BookstoreSelector';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CafeCard } from '../components/search/CafeCard';
import { fetchBookstores, fetchCafes, fetchCafesNearBookstore } from '../apis/places';
import { BookstoreCard } from '../components/search/BookstoreCard';
import { LoadingIcon } from '../components/common/LoadingIcon';
import { useLoading } from '../hooks/useLoading';
import { Header } from '../components/layout/Header';
import { SearchModal } from '../components/search/SearchModal';
import { useModal } from '../components/contexts/ModalContext';
import { FooterNavigation } from '../components/layout/FooterNavigation';
import { likePair } from '../apis/places';

export function SearchResultsPage() {
  const [bookstores, setBookstores] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [activeBookstore, setActiveBookstore] = useState(null);
  const [activeCafe, setActiveCafe] = useState(null);
  const [isOpenCafeCard, setIsOpenCafeCard] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { isOpenModal, closeModal } = useModal();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));
  const searchMode = searchParams.get('mode') ?? 'bookstore';

  const onPairClick = (activeBookstore, cafe) => {
    setActiveCafe(cafe);

    const p = new URLSearchParams(searchParams);
    p.set('b_lat', activeBookstore.lat);
    p.set('b_lng', activeBookstore.lng);
    p.set('c_lat', cafe.lat);
    p.set('c_lng', cafe.lng);
    p.set('mode', 'pair');
    setSearchParams(p);
  };

  const onBookstoreClick = (activeBookstore) => {
    const p = new URLSearchParams(searchParams);
    p.set('b_lat', activeBookstore.lat);
    p.set('b_lng', activeBookstore.lng);
    p.set('mode', 'bookstore');
    setSearchParams(p);
  };

  const onCafeClick = (activeCafe) => {
    const p = new URLSearchParams(searchParams);
    p.set('c_lat', activeCafe.lat);
    p.set('c_lng', activeCafe.lng);
    p.set('mode', 'cafe');
    setSearchParams(p);
  };

  useEffect(() => {
    if (!activeCafe && cafes.length > 0) {
      const first = cafes[0];
      setActiveCafe(first);
    }
  }, [cafes]);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchPlaces = async () => {
      startLoading();
      try {
        if (searchMode === 'bookstore') {
          const res = await fetchBookstores(lat, lng);
          setBookstores(res);
        } else if (searchMode === 'cafe') {
          const res = await fetchCafes(lat, lng);
          setCafes(res);
        } else if (searchMode === 'pair') {
          // TODO: pairの処理
        }
      } catch (err) {
        console.error('SearchResultsPageでのエラー', err);
      } finally {
        stopLoading();
      }
    };
    fetchPlaces();
  }, [lat, lng, searchMode]);

  useEffect(() => {
    if (searchMode === 'bookstore' && activeBookstore) {
      const fetchPlaces = async () => {
        const res = await fetchCafesNearBookstore(
          activeBookstore.lat,
          activeBookstore.lng,
          'Cafe',
          activeBookstore.place_id
        );
        setCafes(res);
      };
      fetchPlaces();
    }
  }, [activeBookstore, searchMode]);

  // 1. 現在地が取得できない場合、'/'にリダイレクト
  useEffect(() => {
    if (!lat || !lng || !searchMode) {
      navigate('/', {
        replace: true,
        state: 'missing_location',
      });
    }
  }, [lat, lng, searchMode]);

  useEffect(() => {
    const initializeActiveBookstore = () => {
      if (bookstores.length > 0 && !activeBookstore) {
        setActiveBookstore(bookstores[0]);
      }
    };

    initializeActiveBookstore();
  }, [bookstores]);

  // useEffectは描画完成した後に副作用として発砲する。つまり、これが先に発砲されnullで描画終了後useEffectが作動し'/'に遷移
  if (!lat || !lng || !searchMode) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <LoadingIcon />
        <p className="mt-2 text-gray-600 text-sm">検索中です…</p>
      </div>
    );
  }

  return (
    <>
      <Header variant="search" className="" />

      {isOpenModal && <SearchModal onClose={closeModal} />}

      <div className="flex flex-col sm:flex-row h-screen ">
        <div className="h-2/5 w-full  sm:w-1/2 sm:h-full">
          <div className="w-full px-4 py-2 bg-gray-100 text-sm text-right">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
              トップに戻る
            </button>
          </div>
          {/* 検索結果マップ */}
          <PlacesMap
            lat={lat}
            lng={lng}
            bookstores={bookstores}
            cafes={cafes}
            activeBookstore={activeBookstore}
            activeCafe={activeCafe}
          />
        </div>

        <div className="h-3/5 w-full pt-9  sm:w-1/2 sm:h-full sm:pt-0 overflow-y-auto pb-16">
          {searchMode === 'bookstore' && (
            <div className="sticky top-0 p-2 bg-white">
              <button
                type="button"
                className="justify-end text-sm text-primary-600 hover:underline"
                onClick={() => setIsOpenCafeCard((prev) => !prev)}
              >
                {isOpenCafeCard ? '本屋を選びなおす' : 'カフェも選ぶ'}
              </button>
            </div>
          )}

          {searchMode === 'bookstore' && !isOpenCafeCard ? (
            <div className="">
              {/* 本屋カード */}
              <BookstoreCard
                bookstores={bookstores}
                onSelectBookstore={setActiveBookstore}
                activeBookstore={activeBookstore}
                setIsOpenCafeCard={setIsOpenCafeCard}
                lat={lat}
                lng={lng}
                onBookstoreClick={onBookstoreClick}
              />
            </div>
          ) : (
            <div className="">
              {/* 書店セレクター */}
              {searchMode === 'bookstore' ||
                (searchMode === 'pair' && (
                  <BookstoreSelector
                    bookstores={bookstores}
                    onSelectBookstore={setActiveBookstore}
                    activeBookstore={activeBookstore}
                  />
                ))}

              {/* カフェカード */}
              <div className="w-full h-full overflow-y-auto">
                <CafeCard
                  cafes={cafes}
                  onSelectCafe={setActiveCafe}
                  activeCafe={activeCafe}
                  activeBookstore={activeBookstore}
                  onClick={(cafe) => {
                    if (activeBookstore) {
                      onPairClick(activeBookstore, cafe);
                    } else {
                      onCafeClick(cafe);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterNavigation />
    </>
  );
}
