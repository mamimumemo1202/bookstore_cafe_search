import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../components/contexts/AuthContext';
import { LoadingProvider } from '../components/contexts/LoadingContext';
import { ModalProvider } from '../components/contexts/ModalContext';
import { SearchResultsPage } from '../pages/SearchResultPage';
import userEvent from '@testing-library/user-event';
import { fetchPlaceDetails } from '../apis/places';
import { useEffect } from 'react';

afterEach(() => cleanup());

function LocationTracker({ onChange }) {
  const location = useLocation();
  useEffect(() => {
    onChange(location);
  }, [location, onChange]);
  return null;
}

vi.mock('../apis/places', () => ({
  fetchBookstores: vi.fn().mockResolvedValue([
    {
      place_id: 'bp1',
      name: '本屋A',
      address: '本屋アドレス',
      likes_count: 0,
      like_id: null,
      pair_like_id: null,
      lat: 50.0,
      lng: 139.0,
      photo_ref: null,
    },
  ]),
  fetchCafes: vi.fn().mockResolvedValue([
    {
      place_id: 'cp1',
      name: 'カフェA',
      address: 'cafeaddress',
      likes_count: 0,
      like_id: null,
      pair_like_id: null,
      lat: 35.0,
      lng: 139.0,
      photo_ref: null,
    },
  ]),
  fetchCafesNearBookstore: vi.fn().mockResolvedValue([
    {
      place_id: 'cp1',
      name: 'カフェA',
      address: 'cafeaddress',
      likes_count: 0,
      like_id: null,
      pair_like_id: null,
      lat: 35.0,
      lng: 139.0,
      photo_ref: null,
    },
  ]),

  fetchPlaceDetails: vi.fn().mockResolvedValue({
    business_status: 'OPERATIONAL',
  }),
}));

// Google Mapsを最小モックにしてJSDOMでの描画とSDK読み込みを回避
vi.mock('@react-google-maps/api', () => ({
  LoadScript: ({ children }) => children,
  GoogleMap: ({ children }) => children,
  Marker: () => null,
}));

function renderSearch(
  url = '/search?lat=50.0&lng=139.0&mode=bookstore',
  onLocationChange = () => {}
) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <AuthProvider>
        <ModalProvider>
          <LoadingProvider>
            <Routes>
              <Route
                path="/search"
                element={
                  <>
                    <LocationTracker onChange={onLocationChange} />
                    <SearchResultsPage />
                  </>
                }
              />
            </Routes>
          </LoadingProvider>
        </ModalProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('/search', () => {
  it('/search?lat=..&lng=..&mode=bookstoreでSearchResultsPageが表示される', async () => {
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore');
    expect(await screen.findByText('本屋A')).toBeTruthy();
  });

  it('/search?lat=..&lng=..&mode=cafeでSearchResultsPageが表示される', async () => {
    renderSearch('/search?lat=35.0&lng=139.0&mode=cafe');
    expect(await screen.findByText('カフェA')).toBeTruthy();
  });

  it('/search?lat=..&lng=..&mode=bookstore&bpid=...', async () => {
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore&bpid=bp1');
    const card = await screen.findByText('本屋A');
    await userEvent.click(card);
    expect(await screen.findByText(/営業/)).toBeTruthy();
    expect(fetchPlaceDetails).toHaveBeenCalled();
  });

  it('本屋クリックでURLSearchParamsにbpidを設定しmode=bookstoreに更新する', async () => {
    let latestLocation;
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore', (location) => {
      latestLocation = location;
    });

    const bookstoreCard = await screen.findByText('本屋A');
    await userEvent.click(bookstoreCard);

    await waitFor(() => {
      const params = new URLSearchParams(latestLocation.search);
      expect(params.get('mode')).toBe('bookstore');
      expect(params.get('bpid')).toBe('bp1');
    });
  });

  it('カフェクリックでURLSearchParamsにcpidを設定しmode=cafeに更新する', async () => {
    let latestLocation;
    renderSearch('/search?lat=35.0&lng=139.0&mode=cafe', (location) => {
      latestLocation = location;
    });

    const cafeCard = await screen.findByText('カフェA');
    await userEvent.click(cafeCard);

    await waitFor(() => {
      const params = new URLSearchParams(latestLocation.search);
      expect(params.get('mode')).toBe('cafe');
      expect(params.get('cpid')).toBe('cp1');
    });
  });

  it('「カフェも選ぶ」クリックでカフェリスト表示に切り替わる', async () => {
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore');
    const card = await screen.findByText('本屋A');
    await userEvent.click(card);
    const button = await screen.findByText('カフェも選ぶ');
    await userEvent.click(button);
    expect(await screen.findByText('カフェA')).toBeTruthy();
  });

  it('本屋からの遷移でカフェクリックでURLSearchParamsにcpidを設定しmode=pairへ更新する', async () => {
    let latestLocation;
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore', (location) => {
      latestLocation = location;
    });

    const bookstoreCard = await screen.findByText('本屋A');
    await userEvent.click(bookstoreCard);

    const button = await screen.findByText('カフェも選ぶ');
    await userEvent.click(button);

    const cafeCard = await screen.findByText('カフェA');
    await userEvent.click(cafeCard);

    await waitFor(() => {
      const params = new URLSearchParams(latestLocation.search);
      expect(params.get('bpid')).toBe('bp1');
      expect(params.get('cpid')).toBe('cp1');
    });
  });
});
