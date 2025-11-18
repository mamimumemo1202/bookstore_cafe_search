import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../components/contexts/AuthContext';
import { LoadingProvider } from '../components/contexts/LoadingContext';
import { ModalProvider } from '../components/contexts/ModalContext';
import { SearchResultsPage } from '../pages/SearchResultPage';
import userEvent from '@testing-library/user-event';
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
  fetchBookstores: vi.fn().mockResolvedValue({
    places: [{
      place_id: 'bp1',
      name: '本屋A',
      address: 'bookstoreAddress',
      likes_count: 0,
      like_id: null,
      pair_like_id: null,
      lat: 50.0,
      lng: 139.0,
      photo_ref: null,
    }],
    next_page_token: 'next_page_token123'
  }),

  fetchCafes: vi.fn().mockResolvedValue({
    places: [{
      place_id: 'cp1',
      name: 'カフェA',
      address: 'cafeaddress',
      likes_count: 0,
      like_id: null,
      pair_like_id: null,
      lat: 35.0,
      lng: 139.0,
      photo_ref: null,
    }],
    next_page_token: null
  }),
  fetchCafesNearBookstore: vi.fn().mockResolvedValue({
    places: [{
      place_id: 'cp1',
      name: 'カフェA',
      address: 'cafeaddress',
      likes_count: 0,
      like_id: null,
      pair_like_id: null,
      lat: 35.0,
      lng: 139.0,
      photo_ref: null,
    }],
    next_page_token: null
  }),

  fetchPlaceDetails: vi.fn().mockResolvedValue({
   business_status: 'OPERATIONAL'
  }),
}));

// Google Mapsを最小モックにしてJSDOMでの描画とSDK読み込みを回避
vi.mock('@react-google-maps/api', () => ({
  LoadScript: ({ children }) => children,
  GoogleMap: ({ children }) => children,
  Marker: () => null,
}));

function renderSearch(
  url = '/search?lat=50.0&lng=139.0&mode=bookstore%view=bookstore',
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
  describe('mode=bookstore', () => {
    it('カードが表示される', async () => {
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore&view=bookstore');
    expect(await screen.findByText('本屋A')).toBeTruthy();
    });

    it('カードクリックでURLにbpidがセットされる', async () => {
    let latestLocation;
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore&view=bookstore', (location) => {
      latestLocation = location
    });

    expect(new URLSearchParams(latestLocation.search).get('bpid')).toBeNull()

    const card = await screen.findByText('本屋A')
    await userEvent.click(card);

    const params = new URLSearchParams(latestLocation.search)
    expect(params.get('bpid')).toBe('bp1')
    })
  })


  describe('mode=cafe', () => {
    it('カードが表示される', async () => {
    renderSearch('/search?lat=35.0&lng=139.0&mode=cafe&view=cafe');
    expect(await screen.findByText('カフェA')).toBeTruthy();
    });

    it('カードクリックでURLにcpidがセットされる', async () => {
    let latestLocation;
    renderSearch('/search?lat=50.0&lng=139.0&mode=cafe&view=cafe', (location) => {
      latestLocation = location
    });

    expect(new URLSearchParams(latestLocation.search).get('cpid')).toBeNull()

    const card = await screen.findByText('カフェA')
    await userEvent.click(card);

    const params = new URLSearchParams(latestLocation.search)
    expect(params.get('cpid')).toBe('cp1')
    })
  })

  
  it('カフェも選ぶを押すとview=cafeになり、カフェカードが表示される', async () => {
    let latestLocation;
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore&view=bookstore', (location) => {
      latestLocation = location
    });
    const button = await screen.findByText('カフェも選ぶ');
    await userEvent.click(button);

    const params = new URLSearchParams(latestLocation.search)

    expect(params.get('view')).toBe('cafe')
    expect(await screen.findByText('カフェA')).toBeTruthy();
  })

  it('本屋を選びなおすを押すとview=bookstoreになり、本屋カードが表示される', async () => {
    let latestLocation;
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore&view=bookstore', (location) => {
      latestLocation = location
    });

    const button1 = await screen.findByText('カフェも選ぶ');
    await userEvent.click(button1);

    const button2 = await screen.findByText('本屋を選びなおす');
    await userEvent.click(button2);

    const params = new URLSearchParams(latestLocation.search)

    expect(params.get('view')).toBe('bookstore')
    expect(await screen.findByText('本屋A')).toBeTruthy();
  })

  it('本屋->カフェ検索し、カフェカードをクリックするとURLにbpid, cpid, mode=pairがセットされる', async() => {
    let latestLocation;
    renderSearch('/search?lat=50.0&lng=139.0&mode=bookstore&view=bookstore', (location) => {
      latestLocation = location;
    });

    const bookstoreCard = await screen.findByText('本屋A')
    await userEvent.click(bookstoreCard)

    const changeViewButton = await screen.findByText('カフェも選ぶ');
    await userEvent.click(changeViewButton);

    const cafeCard = await screen.findByText('カフェA');
    await userEvent.click(cafeCard);

    const params = new URLSearchParams(latestLocation.search);
    expect(params.get('bpid')).toBe('bp1');
    expect(params.get('cpid')).toBe('cp1');
    expect(params.get('mode')).toBe('pair');

  })

  describe('next_page_token', async() => {
    it('next_page_tokenがある場合はボタンからfetchMorePlacesを呼ぶ', async () => {})
    it('next_page_tokenがない場合はボタンが押せない', async () => {})
  })

  it('isLoading=trueの時、スケルトンを表示', async () => {})
  it('', async () => {})

});
