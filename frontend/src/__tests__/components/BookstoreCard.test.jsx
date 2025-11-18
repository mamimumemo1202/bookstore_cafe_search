import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BookstoreCard } from '../../components/search/BookstoreCard';
import { getPlacePhotoUrl } from '../../lib/placePhoto';

vi.mock('../../components/search/PlaceDetailCard', () => ({
  PlaceDetailCard: ({ placeId }) => (
    <div data-testid={`bookstore-detail-${placeId}`}>detail {placeId}</div>
  ),
}));

vi.mock('../../components/search/LikeButton', () => ({
  LikeButton: () => <span>MockLike</span>,
}));

vi.mock('../../lib/placePhoto', () => ({
  getPlacePhotoUrl: vi.fn(),
}));

describe('BookstoreCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPlacePhotoUrl.mockImplementation((ref) => `mock-photo-${ref}`);
  });

  afterEach(() => {
    cleanup();
  });

  const bookstore = {
    place_id: 'bp1',
    name: 'Bookstore1',
    photo_ref: 'photo-1',
    like_id: null,
  };

  const bookstores = [{
    place_id: 'bp1',
    name: 'Bookstore1',
    photo_ref: 'photo-1',
    like_id: null,
  },
  {
      place_id: 'bp2',
      name: 'Bookstore2',
      photo_ref: 'photo-2',
      like_id: null,
    }]

  it('本屋カードがクリックされたときに詳細が表示され、再押下で閉じる', async () => {
    const onSelectBookstore = vi.fn();
    const handleLoadMoreBookstores = vi.fn()

    render(
      <BookstoreCard
        bookstores={[bookstore]}
        onSelectBookstore={onSelectBookstore}
        activeBookstore={null}
        canLoadMore={false}
        onLoadMore={handleLoadMoreBookstores}
      />
    );

    expect(screen.queryByTestId('bookstore-detail-bp1')).toBeNull();

    const heading = screen.getByRole('heading', { name: 'Bookstore1' });
    await userEvent.click(heading);

    expect(onSelectBookstore).toHaveBeenCalledWith(bookstore);
    expect(screen.getByTestId('bookstore-detail-bp1')).toBeTruthy();
    expect(getPlacePhotoUrl).toHaveBeenCalledWith('photo-1');

    await userEvent.click(heading);
    expect(screen.queryByTestId('bookstore-detail-bp1')).toBeNull();
  });

  it('カードそれぞれで開閉できる', async () => {
    const onSelectBookstore = vi.fn();
    const handleLoadMoreBookstores = vi.fn()

    render(
      <BookstoreCard
        bookstores={bookstores}
        onSelectBookstore={onSelectBookstore}
        activeBookstore={null}
        canLoadMore={false}
        onLoadMore={handleLoadMoreBookstores}
      />
    );

    expect(screen.queryByTestId('bookstore-detail-bp1')).toBeNull();
    expect(screen.queryByTestId('bookstore-detail-bp2')).toBeNull();

    const first = screen.getByRole('heading', { name: 'Bookstore1' });
    await userEvent.click(first);

    const second = screen.getByRole('heading', { name: 'Bookstore2' });
    await userEvent.click(second);

    expect(screen.getByTestId('bookstore-detail-bp1')).toBeTruthy();
    expect(screen.getByTestId('bookstore-detail-bp2')).toBeTruthy();
  });

  it('いいねしたときに詳細が表示されない', async () => {
    const onSelectBookstore = vi.fn();
    const handleLoadMoreBookstores = vi.fn()

    render(
      <BookstoreCard
        bookstores={[bookstore]}
        onSelectBookstore={onSelectBookstore}
        activeBookstore={null}
        canLoadMore={false}
        onLoadMore={handleLoadMoreBookstores}
      />
    );

    const likeButton = screen.getByRole('button', { name: 'MockLike' });
    await userEvent.click(likeButton);

    expect(onSelectBookstore).not.toHaveBeenCalled();
  });
  
  it('canLoadMore={false} "すべての結果を表示中"と表示', async () => {
    const onSelectBookstore = vi.fn();
    const handleLoadMoreBookstores = vi.fn()

    render(
      <BookstoreCard
        bookstores={[bookstore]}
        onSelectBookstore={onSelectBookstore}
        activeBookstore={null}
        canLoadMore={false}
        onLoadMore={handleLoadMoreBookstores}
      />
    );

    expect(screen.getByText('すべての結果を表示中')).toBeInTheDocument();

  });

  it('canLoadMore={true} さらにカードを表示', async () => {
    const onSelectBookstore = vi.fn();
    const handleLoadMoreBookstores = vi.fn();

    render(
      <BookstoreCard
        bookstores={[bookstore]}
        onSelectBookstore={onSelectBookstore}
        activeBookstore={null}
        canLoadMore={true}
        onLoadMore={handleLoadMoreBookstores}
      />
    );

    const button = screen.getByRole('button', { name: 'もっと見る' });
    await userEvent.click(button);

    expect(handleLoadMoreBookstores).toHaveBeenCalled();
  });

});
