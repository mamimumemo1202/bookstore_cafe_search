import { useState, useEffect } from 'react';
import { PlacesMap } from '../components/search/PlacesMap';
import { BookstoreSelector } from '../components/search/BookstoreSelector';
import { useNavigate } from 'react-router-dom';
import { CafeCard } from '../components/search/CafeCard';
import {
  fetchBookstores,
  fetchCafes,
  fetchCafesNearBookstore,
  fetchMorePlaces
} from '../apis/places';
import { BookstoreCard } from '../components/search/BookstoreCard';
import { Header } from '../components/layout/Header';
import { SearchModal } from '../components/search/SearchModal';
import { useModal } from '../components/contexts/ModalContext';
import { useLoading } from '../components/contexts/LoadingContext';
import { FooterNavigation } from '../components/layout/FooterNavigation';
import { toast } from 'react-toastify';
import { CardSkeleton } from '../components/search/Skeleton';
import { useSearchQuerySync } from '../hooks/useSearchQuerySync';

export function SearchResultsPage() {
  const [bookstores, setBookstores] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [activeBookstore, setActiveBookstore] = useState(null);
  const [activeCafe, setActiveCafe] = useState(null);
  const [bookstoreNextPageToken, setBookstoreNextPageToken] = useState('');
  const [cafeNextPageToken, setCafeNextPageToken] = useState('');
  const { isLoading, withLoading } = useLoading();
  const { isOpenModal, closeModal } = useModal();
  const { 
        searchParams,  
        onPairClick, 
        onBookstoreClick, 
        onCafeClick,
        onChangeViewClick,
        lat, 
        lng, 
        searchMode, 
        view } = useSearchQuerySync()

  const navigate = useNavigate();

  const notify = (status) => {
    if (status) toast.error('エラーが発生しました。ホームに戻ってください。');
  };

  const handleLoadMoreBookstores = async () => {
    if (!bookstoreNextPageToken) return;

    try {
      const res = await fetchMorePlaces({
        pagetoken: bookstoreNextPageToken,
        type: 'Bookstore',
      });
      setBookstores((prev) => [...prev, ...res.places]);
      setBookstoreNextPageToken(res.next_page_token || '');
    } catch (error) {
      notify(error?.response?.status);
    }
  };

  const resolveCafePaginationContext = () => {
    if (searchMode === 'cafe') {
      return { type: 'Cafe', bpid: undefined };
    }

    if (searchMode === 'pair') {
      const bpid = searchParams.get('bpid') || activeBookstore?.place_id;
      return { type: 'Pair', bpid };
    }

    return {
      type: 'Cafe',
      bpid: activeBookstore?.place_id,
    };
  };

  const handleLoadMoreCafes = async () => {
    if (!cafeNextPageToken) return;

    const { type, bpid } = resolveCafePaginationContext();
    if (!type) return;

    try {
      const res = await fetchMorePlaces({
        pagetoken: cafeNextPageToken,
        type,
        bpid,
      });
      setCafes((prev) => [...prev, ...res.places]);
      setCafeNextPageToken(res.next_page_token || '');
    } catch (error) {
      notify(error?.response?.status);
    }
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
      try {
        await withLoading(async () => {
          if (searchMode === 'bookstore') {
            const res = await fetchBookstores(lat, lng);
            setBookstores(res.places);
            setBookstoreNextPageToken(res.next_page_token || '');
          } else if (searchMode === 'cafe') {
            const res = await fetchCafes(lat, lng);
            setCafes(res.places);
            setCafeNextPageToken(res.next_page_token || '');
          } else if (searchMode === 'pair') {
            const bpid = searchParams.get('bpid');
            if (bpid) {
              const res = await fetchCafesNearBookstore(bpid, 'Pair');
              setCafes(res.places);
              setCafeNextPageToken(res.next_page_token || '');

              const bs = await fetchBookstores(lat, lng);
              const b = bs.places.find((b) => b.place_id === bpid);
              setActiveBookstore(b);
            }
          }
        });
      } catch (error) {
        notify(error?.response?.status);
      }
    };
    fetchPlaces();
  }, [lat, lng, searchMode]);

  // ピンを表示するために必要です
  // カフェも選ぶボタンを押すと新しく取得せず、そのまま渡してる
  // リロードしたらこれらのデータは消える＝また新しく取得しなければならない
  useEffect(() => {
    if (searchMode === 'bookstore' && activeBookstore) {
      const fetchPlaces = async () => {
        const res = await fetchCafesNearBookstore(activeBookstore.place_id, 'Cafe');
        setCafes(res.places);
        setCafeNextPageToken(res.next_page_token || '');
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

  return (
    <>
      <Header variant="search" className="" />

      {isOpenModal && <SearchModal onClose={closeModal} />}

      <div className="pt-16 min-h-screen flex flex-col">
        <div className="h-60 w-full">
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

        <div className="flex-1 overflow-y-auto pb-16">
          {searchMode !== 'cafe' && (
            <div className="sticky top-0">
              <div className={`flex p-3 ${view === 'cafe' ? 'justify-starts' : 'justify-end'}`}>
                <button
                  type="button"
                  className="text-md underline"
                  onClick={() => onChangeViewClick()}
                >
                  {view === 'cafe' ? '本屋を選びなおす' : 'カフェも選ぶ'}
                </button>
              </div>
            </div>
          )}

          {searchMode === 'bookstore' && view ==='bookstore' ? (
            <div className="h-full overflow-y-auto px-2">
              {/* 本屋カード */}
              {isLoading && (
                <div className="grid grid-col gap-2">
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              )}

                <BookstoreCard
                  bookstores={bookstores}
                  onSelectBookstore={(bookstore) => {
                    setActiveBookstore(bookstore);
                    onBookstoreClick(bookstore);
                  }}
                  activeBookstore={activeBookstore}
                  canLoadMore={!!bookstoreNextPageToken}
                  onLoadMore={handleLoadMoreBookstores}
                />
            </div>
          ) : (
            <div className="flex h-full flex-col overflow-hidden">

              {/* カフェカード */}
              <div className="flex-1 overflow-y-auto">
                {isLoading && (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                )}

                <CafeCard
                  cafes={cafes}
                  onSelectCafe={setActiveCafe}
                  activeCafe={activeCafe}
                  activeBookstore={activeBookstore}
                  onClick={(cafe) => {
                    if (activeBookstore) {
                      onPairClick(activeBookstore, cafe);
                      setActiveCafe(cafe)
                    } else {
                      onCafeClick(cafe);
                    }
                  }}
                  canLoadMore={!!cafeNextPageToken}
                  onLoadMore={handleLoadMoreCafes}
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
