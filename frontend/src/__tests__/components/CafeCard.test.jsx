import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    photo_ref: 'photo-2',
    like_id: null,
    pair_like_id: null,
  };

  it('カフェカードがクリックされたときに詳細を表示する', async () => {
    const onSelectCafe = vi.fn();
    const onClick = vi.fn();

    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={onSelectCafe}
        onClick={onClick}
        activeBookstore={null}
        activecafe={null}
      />
    );

    expect(screen.queryByTestId('cafe-detail-cp1')).toBeNull();

    const heading = screen.getByRole('heading', { name: 'cafe1' });
    await userEvent.click(heading);

    expect(onSelectCafe).toHaveBeenCalledWith(cafe);
    expect(onClick).toHaveBeenCalledWith(cafe);
    expect(screen.getByTestId('cafe-detail-cp1')).toBeTruthy();
    expect(getPlacePhotoUrl).toHaveBeenCalledWith('photo-2');
  });

  it('本屋がActiveの時だけペアいいねボタンが出てくる', async () => {
    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={vi.fn()}
        onClick={vi.fn()}
        activeBookstore={{ place_id: 'bp1' }}
        activecafe={null}
      />
    );

    expect(screen.getByRole('button', { name: 'MockPair' })).toBeTruthy();

    cleanup();

    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={vi.fn()}
        onClick={vi.fn()}
        activeBookstore={null}
        activecafe={null}
      />
    );

    expect(screen.queryByRole('button', { name: 'MockPair' })).toBeNull();
  });

  it('いいねしたときに詳細が表示されない', async () => {
    const onSelectCafe = vi.fn();
    const onClick = vi.fn();

    render(
      <CafeCard
        cafes={[cafe]}
        onSelectCafe={onSelectCafe}
        onClick={onClick}
        activeBookstore={{ place_id: 'bp1' }}
        activecafe={cafe}
      />
    );

    const likeButton = screen.getByRole('button', { name: 'MockCafeLike' });
    await userEvent.click(likeButton);
    expect(onSelectCafe).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();

    const pairButton = screen.getByRole('button', { name: 'MockPair' });
    await userEvent.click(pairButton);
    expect(onSelectCafe).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
