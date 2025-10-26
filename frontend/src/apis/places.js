import axios from 'axios';
import { getAuthInfo } from '.';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const autocomplete = async ( query ) => {
  const response = await axios.post(`${BASE_URL}/autocomplete`, {
            input: query})
  return response.data;
}

export const fetchBookstores = async (lat, lng, type = 'Bookstore') => {

  const response = await axios.get(`${BASE_URL}/places`, {
    params: {
      lat,
      lng,
      type,
    },
  });
  return response.data.places;
};

export const fetchCafes = async (lat, lng, type = 'Cafe') => {
  const response = await axios.get(`${BASE_URL}/places`, {
    params: {
      lat,
      lng,
      type,
    },
  });
  return response.data.places;
};

export const fetchCafesNearBookstore = async (bpid, type = 'Pair') => {
  const geo = await fetchGeometry(bpid)
  
  const response = await axios.get(`${BASE_URL}/places`, {
    params: {
      lat: geo.lat,
      lng: geo.lng,
      type,
      bpid
    },
  });
  return response.data.places;
};

export const fetchGeometry = async (place_id) => {

  const response = await axios.get(`${BASE_URL}/places/${place_id}/geometry`);
  return response.data.geometry
};

export const fetchPlaceDetails = async (place_id) => {

  const response = await axios.get(`${BASE_URL}/places/${place_id}`);
  return response.data.place;
};

export const fetchPlaceDetailsBulk = async (place_ids) => {

  const response = await axios.get(`${BASE_URL}/places/get_details_bulk/`, {
    params: { place_ids: place_ids }
  });
  return response.data.details_bulk;
};

export const fetchLikes = async () => {
  const authInfo = getAuthInfo();

  const res = await axios.get(`${BASE_URL}/likes`, {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return res.data.liked_places;
};

export const likePlace = async (placeId, type) => {
  const authInfo = getAuthInfo();

  const res = await axios.post(
    `${BASE_URL}/likes`,
    {
      place_id: placeId,
      type,
    },

    {
      headers: {
        'access-token': authInfo['access-token'],
        client: authInfo['client'],
        uid: authInfo['uid'],
      },
    }
  );
  return res.data.like_id;
};

export const unlikePlace = async (likeId) => {
  const authInfo = getAuthInfo();

  const res = await axios.delete(`${BASE_URL}/likes/${likeId}`, {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return res.data.likes_count;
};

export const likePair = async (bookstorePlaceId, activeCafePlaceId) => {
  const authInfo = getAuthInfo();

  const res = await axios.post(
    `${BASE_URL}/likes`,
    {
      bookstore_place_id: bookstorePlaceId,
      cafe_place_id: activeCafePlaceId,
      type: 'Pair',
    },

    {
      headers: {
        'access-token': authInfo['access-token'],
        client: authInfo['client'],
        uid: authInfo['uid'],
      },
    }
  );
  return res.data;
};
