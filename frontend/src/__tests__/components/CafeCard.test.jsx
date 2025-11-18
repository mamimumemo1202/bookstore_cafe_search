import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CafeCard } from '../../components/search/CafeCard';
import { getPlacePhotoUrl } from '../../lib/placePhoto';

vi.mock('../../components/search/PlaceDetailCard', () => ({
  PlaceDetailCard: ({ placeId }) => (
    <div data-testid={`cafe-detail-${placeId}`}>detail {placeId}</div>
  ),
}));

vi.mock('../../components/search/LikeButton', () => ({
  LikeButton: () => <span>MockCafeLike</span>,
}));

vi.mock('../../components/search/LikePairButton', () => ({
  LikePairButton: () => <span>MockPair</span>,
}));

vi.mock('../../lib/placePhoto', () => ({
  getPlacePhotoUrl: vi.fn(),
}));

describe('CafeCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPlacePhotoUrl.mockImplementation((ref) => `mock-photo-${ref}`);
  });

  afterEach(() => {
    cleanup();
  });

  const cafe = {
    place_id: 'cp1',
    name: 'cafe1',
    photo_ref: 'photo-1',
    like_id: null,
    pair_like_id: null,
  };

  const cafes = [{
    place_id: 'cp1',
    name: 'cafe1',
    photo_ref: 'photo-1',
    like_id: null,
    pair_like_id: null,
  },
  {
      place_id: 'cp2',
      name: 'cafe2',
      photo_ref: 'photo-2',
      like_id: null,
      pair_like_id: null,
  }]

  it('カフェカードがクリックされたときに詳細が表示され、再押下で閉じる', async () => {
    const setActiveCafe = vi.fn()
    const onClick = vi.fn()
    const handleLoadMoreCafes = vi.fn()

    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={setActiveCafe}
        activeCafe={null}
        activeBookstore={null}
        onClick={onClick}
        canLoadMore={null}
        onLoadMore={handleLoadMoreCafes}
      />
    );

    expect(screen.queryByTestId('cafe-detail-cp1')).toBeNull();

    const heading = screen.getByRole('heading', { name: 'cafe1' });
    await userEvent.click(heading);

    expect(setActiveCafe).toHaveBeenCalledWith(cafe);
    expect(onClick).toHaveBeenCalledWith(cafe);
    expect(screen.getByTestId('cafe-detail-cp1')).toBeTruthy();
    expect(getPlacePhotoUrl).toHaveBeenCalledWith('photo-1');

    await userEvent.click(heading);
    expect(screen.queryByTestId('cafe-detail-cp1')).toBeNull();

  });


  it('カードそれぞれで開閉できる', async () => {
    const setActiveCafe = vi.fn()
    const onClick = vi.fn()
    const handleLoadMoreCafes = vi.fn()


    render(
      <CafeCard
        cafes={cafes}
        onSelectCafe={setActiveCafe}
        activeCafe={null}
        activeBookstore={null}
        onClick={onClick}
        canLoadMore={null}
        onLoadMore={handleLoadMoreCafes}
      />
    );

    expect(screen.queryByTestId('cafe-detail-cp1')).toBeNull();
    expect(screen.queryByTestId('cafe-detail-cp2')).toBeNull();

    const first = screen.getByRole('heading', { name: 'cafe1' });
    await userEvent.click(first);

    const second = screen.getByRole('heading', { name: 'cafe2' });
    await userEvent.click(second);

    expect(screen.getByTestId('cafe-detail-cp1')).toBeTruthy();
    expect(screen.getByTestId('cafe-detail-cp2')).toBeTruthy();
  });

  it('本屋がActiveの時だけペアいいねボタンが出てくる', async () => {
    const setActiveCafe = vi.fn()
    const onPairClick = vi.fn()
    const handleLoadMoreCafes = vi.fn()

    render(
      <CafeCard
        cafes={cafes}
        onSelectCafe={setActiveCafe}
        activeCafe={null}
        activeBookstore={null}
        onClick={onPairClick}
        canLoadMore={null}
        onLoadMore={handleLoadMoreCafes}
      />
    );

    expect(screen.queryByRole('button', { name: 'MockPair' })).toBeNull();

    cleanup();
    
    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={setActiveCafe}
        activeCafe={null}
        activeBookstore={{place_id: 'bp1'}}
        onClick={onPairClick}
        canLoadMore={null}
        onLoadMore={handleLoadMoreCafes}
      />
    );

    expect(screen.getByRole('button', { name: 'MockPair' })).toBeTruthy();
  });

  it('いいねしたときに詳細が表示されない', async () => {
    const setActiveCafe = vi.fn()
    const onClick = vi.fn()
    const handleLoadMoreCafes = vi.fn()


    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={setActiveCafe}
        activeCafe={null}
        activeBookstore={null}
        onClick={onClick}
        canLoadMore={null}
        onLoadMore={handleLoadMoreCafes}
      />
    );

    const likeButton = screen.getByRole('button', { name: 'MockCafeLike' });
    await userEvent.click(likeButton);
    expect(setActiveCafe).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('canLoadMore={false} "すべての結果を表示中"と表示', async () => {
    const setActiveCafe = vi.fn()
    const onClick = vi.fn()
    const handleLoadMoreCafes = vi.fn()


    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={setActiveCafe}
        activeCafe={null}
        activeBookstore={null}
        onClick={onClick}
        canLoadMore={false}
        onLoadMore={handleLoadMoreCafes}
      />
    );

    expect(screen.getByText('すべての結果を表示中')).toBeInTheDocument();

  });

  it('canLoadMore={true} さらにカードを表示', async () => {
    const setActiveCafe = vi.fn()
    const onClick = vi.fn()
    const handleLoadMoreCafes = vi.fn()


    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={setActiveCafe}
        activeCafe={null}
        activeBookstore={null}
        onClick={onClick}
        canLoadMore={true}
        onLoadMore={handleLoadMoreCafes}
      />
    );

    const button = screen.getByRole('button', { name: 'もっと見る' });
    await userEvent.click(button);

    expect(handleLoadMoreCafes).toHaveBeenCalled();
  });

});
