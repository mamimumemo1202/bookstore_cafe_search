import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PlaceDetailCard } from '../components/search/PlaceDetailCard';
import { fetchPlaceDetails } from '../apis/places';
import { getPlacePhotoUrl } from '../lib/placePhoto';

vi.mock('../apis/places', () => ({
  fetchPlaceDetails: vi.fn(),
}));

vi.mock('../lib/placePhoto', () => ({
  getPlacePhotoUrl: vi.fn(),
}));

describe('PlaceDetailCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('写真を3枚表示する', async () => {
    fetchPlaceDetails.mockResolvedValue({
      photos: [
        { photo_reference: 'photo-1' },
        { photo_reference: 'photo-2' },
        { photo_reference: 'photo-3' },
        { photo_reference: 'photo-4' },
      ],
      formatted_address: 'Tokyo',
      website: 'https://example.com',
      open_now: true,
      opening_hours: { weekday_text: ['Mon: 9-18'] },
      rating: 4.2,
      name: 'Example Place',
    });
    getPlacePhotoUrl.mockImplementation((ref) => `https://images.example/${ref}`);

    render(<PlaceDetailCard placeId="place-1" />);

    const images = await screen.findAllByRole('img', { name: 'place photo' });
    console.log(images)
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', 'https://images.example/photo-1');

    expect(getPlacePhotoUrl).toHaveBeenCalledTimes(3);
    expect(getPlacePhotoUrl).toHaveBeenNthCalledWith(1, 'photo-1');
    expect(getPlacePhotoUrl).toHaveBeenNthCalledWith(2, 'photo-2');
    expect(getPlacePhotoUrl).toHaveBeenNthCalledWith(3, 'photo-3');
    expect(getPlacePhotoUrl).not.toHaveBeenCalledWith('photo-4');
    expect(fetchPlaceDetails).toHaveBeenCalledWith('place-1');
  });

  it('写真がないときNo-image.pngを表示する', async () => {
    fetchPlaceDetails.mockResolvedValue({
      photos: [],
      formatted_address: 'Tokyo',
      website: null,
      open_now: false,
      opening_hours: null,
      rating: null,
      name: 'Example Place',
    });

    render(<PlaceDetailCard placeId="place-2" />);

    const placeholder = await screen.findByRole('img', { name: 'No image' });
    expect(placeholder.getAttribute('src')).toContain('no-image');
    expect(getPlacePhotoUrl).not.toHaveBeenCalled();
    expect(fetchPlaceDetails).toHaveBeenCalledWith('place-2');
  });
});

