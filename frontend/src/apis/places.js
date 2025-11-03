import axios from 'axios';
import { getAuthInfo } from '.';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const buildAuthHeader = () => {
  const authInfo = getAuthInfo();

  if (!authInfo['access-token'] || !authInfo.client || !authInfo.uid) return {};

  return {
    'access-token': authInfo['access-token'],
    client: authInfo.client,
    uid: authInfo.uid,
  };
};

export const autocomplete = async (query) => {
  const response = await axios.post(`${BASE_URL}/autocomplete`, {
    input: query,
  });
  return response.data;
};

export const fetchBookstores = async (lat, lng, type = 'Bookstore') => {
  const response = await axios.get(`${BASE_URL}/places`, {
    params: { lat, lng, type },
    headers: buildAuthHeader(),
  });
  return response.data.places;
};

export const fetchCafes = async (lat, lng, type = 'Cafe') => {
  const response = await axios.get(`${BASE_URL}/places`, {
    params: { lat, lng, type },
    headers: buildAuthHeader(),
  });
  return response.data.places;
};

export const fetchCafesNearBookstore = async (bpid, type = 'Pair') => {
  const geo = await fetchGeometry(bpid);

  const response = await axios.get(`${BASE_URL}/places`, {
    params: { lat: geo.lat, lng: geo.lng, type, bpid },
    headers: buildAuthHeader(),
  });
  return response.data.places;
};

export const fetchGeometry = async (place_id) => {
  const response = await axios.get(`${BASE_URL}/places/${place_id}/geometry`);
  return response.data.geometry;
};

export const fetchPlaceDetails = async (place_id) => {
  const response = await axios.get(`${BASE_URL}/places/${place_id}`);
  return response.data.place;
};

export const fetchPlaceDetailsBulk = async (place_ids) => {
  const response = await axios.get(`${BASE_URL}/places/get_details_bulk/`, {
    params: { place_ids: place_ids },
  });
  return response.data.details_bulk;
};

export const fetchLikes = async () => {
  const res = await axios.get(`${BASE_URL}/likes`, {
    headers: buildAuthHeader(),
  });
  return res.data.liked_places;
};

export const likePlace = async (placeId, type) => {
  const res = await axios.post(
    `${BASE_URL}/likes`,
    {
      place_id: placeId,
      type,
    },
    {
      headers: buildAuthHeader(),
    }
  );
  return res.data.like_id;
};

export const unlikePlace = async (likeId) => {
  const res = await axios.delete(`${BASE_URL}/likes/${likeId}`, {
    headers: buildAuthHeader(),
  });
  return res.data.likes_count;
};

export const likePair = async (bookstorePlaceId, activeCafePlaceId) => {
  const res = await axios.post(
    `${BASE_URL}/likes`,
    {
      bookstore_place_id: bookstorePlaceId,
      cafe_place_id: activeCafePlaceId,
      type: 'Pair',
    },
    {
      headers: buildAuthHeader(),
    }
  );
  return res.data;
};
