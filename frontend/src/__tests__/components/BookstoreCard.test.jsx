import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BookstoreCard } from '../../components/search/BookstoreCard';
import { getPlacePhotoUrl } from '../../lib/placePhoto';

vi.mock('../../components/search/PlaceDetailCard', () => ({
  PlaceDetailCard: ({ placeId }) => <div data-testid={`bookstore-detail-${placeId}`}>detail {placeId}</div>,
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

  it('本屋カードがクリックされたときに詳細を表示する', async () => {
    const onSelectBookstore = vi.fn();
    const onBookstoreClick = vi.fn();

    render(
      <BookstoreCard
        bookstores={[bookstore]}
        onSelectBookstore={onSelectBookstore}
        onBookstoreClick={onBookstoreClick}
        activeBookstore={null}
      />,
    );

    expect(screen.queryByTestId('bookstore-detail-bp1')).toBeNull();

    const heading = screen.getByRole('heading', { name: 'Bookstore1' });
    await userEvent.click(heading);

    expect(onSelectBookstore).toHaveBeenCalledWith(bookstore);
    expect(onBookstoreClick).toHaveBeenCalledWith(bookstore);
    expect(screen.getByTestId('bookstore-detail-bp1')).toBeTruthy();
    expect(getPlacePhotoUrl).toHaveBeenCalledWith('photo-1');
  });

  it('いいねしたときに詳細が表示されない', async () => {
    const onSelectBookstore = vi.fn();
    const onBookstoreClick = vi.fn();

    render(
      <BookstoreCard
        bookstores={[bookstore]}
        onSelectBookstore={onSelectBookstore}
        onBookstoreClick={onBookstoreClick}
        activeBookstore={bookstore}
      />,
    );

    const likeButton = screen.getByRole('button', { name: 'MockLike' });
    await userEvent.click(likeButton);

    expect(onSelectBookstore).not.toHaveBeenCalled();
    expect(onBookstoreClick).not.toHaveBeenCalled();
  });
});
