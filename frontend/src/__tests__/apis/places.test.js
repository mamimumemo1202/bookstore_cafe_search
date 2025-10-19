import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';

vi.mock('axios');

vi.mock('../../apis', () => ({
  getAuthInfo: vi.fn(),
}));

import { getAuthInfo } from '../../apis';
import {
  fetchBookstores,
  fetchCafes,
  fetchCafesNearBookstore,
  fetchGeometry,
  fetchPlaceDetails,
  fetchPlaceDetailsBulk,
  fetchLikes,
  likePlace,
  unlikePlace,
  likePair,
} from '../../apis/places';

describe('places api client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetchBookstores は lat/lng/type をクエリに含めて GET する', async () => {
    axios.get.mockResolvedValue({ data: { places: [] } });

    await fetchBookstores(35.0, 139.0, 'Bookstore');

    expect(axios.get).toHaveBeenCalledWith('/api/v1/places', {
      params: { lat: 35.0, lng: 139.0, type: 'Bookstore' },
    });
  });

  it('fetchCafes は lat/lng/type をクエリに含めて GET する', async () => {
    axios.get.mockResolvedValue({ data: { places: [] } });

    await fetchCafes(35.0, 139.0, 'Cafe');

    expect(axios.get).toHaveBeenCalledWith('/api/v1/places', {
      params: { lat: 35.0, lng: 139.0, type: 'Cafe' },
    });
  });

  it('fetchCafesNearBookstore は geometry の結果を使って Pair リクエストを送る', async () => {
    axios.get
      .mockResolvedValueOnce({ data: { geometry: { lat: 10, lng: 20 } } })
      .mockResolvedValueOnce({ data: { places: ['cafe-1'] } });

    const result = await fetchCafesNearBookstore('bp1', 'Pair');

    expect(axios.get).toHaveBeenNthCalledWith(1, '/api/v1/places/bp1/geometry');
    expect(axios.get).toHaveBeenNthCalledWith(2, '/api/v1/places', {
      params: { lat: 10, lng: 20, type: 'Pair', bpid: 'bp1' },
    });
    expect(result).toEqual(['cafe-1']);
  });

  it('fetchGeometry は GET /geometry を呼ぶ', async () => {
    axios.get.mockResolvedValue({ data: { geometry: { lat: 1, lng: 2 } } });

    const result = await fetchGeometry('pid');

    expect(axios.get).toHaveBeenCalledWith('/api/v1/places/pid/geometry');
    expect(result).toEqual({ lat: 1, lng: 2 });
  });

  it('fetchPlaceDetails は GET /places/:id を呼ぶ', async () => {
    axios.get.mockResolvedValue({ data: { place: { name: 'foo' } } });

    const result = await fetchPlaceDetails('pid');

    expect(axios.get).toHaveBeenCalledWith('/api/v1/places/pid');
    expect(result).toEqual({ name: 'foo' });
  });

  it('fetchPlaceDetailsBulk は GET /get_details_bulk で place_ids を渡す', async () => {
    axios.get.mockResolvedValue({ data: { details_bulk: ['foo'] } });

    const result = await fetchPlaceDetailsBulk(['pid1', 'pid2']);

    expect(axios.get).toHaveBeenCalledWith('/api/v1/places/get_details_bulk/', {
      params: { place_ids: ['pid1', 'pid2'] },
    });
    expect(result).toEqual(['foo']);
  });

  it('fetchLikes は認証ヘッダ付きで GET /likes を呼ぶ', async () => {
    getAuthInfo.mockReturnValue({
      'access-token': 'token',
      client: 'client-id',
      uid: 'uid-123',
    });
    axios.get.mockResolvedValue({ data: { liked_places: [] } });

    await fetchLikes();

    expect(axios.get).toHaveBeenCalledWith('/api/v1/likes', {
      headers: {
        'access-token': 'token',
        client: 'client-id',
        uid: 'uid-123',
      },
    });
  });

  it('likePlace は認証ヘッダ付きで POST /likes を呼ぶ', async () => {
    getAuthInfo.mockReturnValue({
      'access-token': 'token',
      client: 'client-id',
      uid: 'uid-123',
    });
    axios.post.mockResolvedValue({ data: { like_id: 99 } });

    const result = await likePlace('pid', 'Bookstore');

    expect(axios.post).toHaveBeenCalledWith(
      '/api/v1/likes',
      {
        place_id: 'pid',
        type: 'Bookstore',
      },
      {
        headers: {
          'access-token': 'token',
          client: 'client-id',
          uid: 'uid-123',
        },
      },
    );
    expect(result).toBe(99);
  });

  it('unlikePlace は認証ヘッダ付きで DELETE /likes/:id を呼ぶ', async () => {
    getAuthInfo.mockReturnValue({
      'access-token': 'token',
      client: 'client-id',
      uid: 'uid-123',
    });
    axios.delete.mockResolvedValue({ data: { likes_count: 1 } });

    const result = await unlikePlace(3);

    expect(axios.delete).toHaveBeenCalledWith('/api/v1/likes/3', {
      headers: {
        'access-token': 'token',
        client: 'client-id',
        uid: 'uid-123',
      },
    });
    expect(result).toBe(1);
  });

  it('likePair は認証ヘッダ付きで POST /likes を呼ぶ', async () => {
    getAuthInfo.mockReturnValue({
      'access-token': 'token',
      client: 'client-id',
      uid: 'uid-123',
    });
    axios.post.mockResolvedValue({ data: { pair_like_id: 77 } });

    const result = await likePair('book-id', 'cafe-id');

    expect(axios.post).toHaveBeenCalledWith(
      '/api/v1/likes',
      {
        bookstore_place_id: 'book-id',
        cafe_place_id: 'cafe-id',
        type: 'Pair',
      },
      {
        headers: {
          'access-token': 'token',
          client: 'client-id',
          uid: 'uid-123',
        },
      },
    );
    expect(result).toEqual({ pair_like_id: 77 });
  });
});

